package com.a506.comeet.app.room.service;

import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.repository.RoomKeywordRepository;
import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.entity.RoomMember;
import com.a506.comeet.app.room.repository.ChannelRepository;
import com.a506.comeet.app.room.repository.LoungeRepository;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.common.util.DateParser;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import com.a506.comeet.metadata.repository.CustomRedisRepository;
import com.a506.comeet.metadata.repository.MemberRedisRepository;
import com.a506.comeet.metadata.repository.RoomRedisRepository;
import com.a506.comeet.metadata.service.MetadataService;
import com.a506.comeet.metadata.service.dto.MetadataCreateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    private final RoomMemberRepository roomMemberRepository;
    private final RoomKeywordRepository roomKeywordRepository;
    private final KeywordRepository keywordRepository;
    private final LoungeRepository loungeRepository;
    private final ChannelRepository channelRepository;

    private final MemberRedisRepository memberRedisRepository;
    private final RoomRedisRepository roomRedisRepository;
    private final CustomRedisRepository customRedisRepository;

    private final MetadataService metadataService;
    private final S3UploadService s3UploadService;

    private final String DEFAULT_CHANNEL_NAME = "기본 채널";
    private final String DEFAULT_LOUNGE_NAME = "기본 라운지";

    @Transactional
    public Room create(RoomCreateRequestDto req, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Room room = Room.builder().
                manager(member).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                type(req.getType()).
                constraints(req.getConstraints()).build();

        Room created = roomRepository.save(room);

        // 키워드 저장
        if (req.getKeywordIds() != null){
            for (Long keywordId : req.getKeywordIds()) {
                Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_KEYWORD));
                RoomKeyword roomKeyword = roomKeywordRepository.save(new RoomKeyword(created, keyword));
                room.addKeyword(roomKeyword);
            }
        }

        // 방 생성시 기본 라운지, 기본 채널 생성
        loungeRepository.save(Lounge.builder().name(DEFAULT_LOUNGE_NAME).room(created).build());
        channelRepository.save(Channel.builder().name(DEFAULT_CHANNEL_NAME).room(created).build());

        // 지속방이면 방장을 해당 방에 가입
        if (req.getType() != null && req.getType().equals(RoomType.PERMANENT))
            joinMemberInnerLogic(member, created);

        return created;
    }

    @Transactional
    public void update(RoomUpdateRequestDto req, String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));
        // 해당 요청을 방장이 요청했는지 확인
        authorityValidation(room, memberId);
        Member newManager = req.getMangerId() != null?
                memberRepository.findById(req.getMangerId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "변경 요청한 새로운 매니저 아이디가 서비스 내에 존재하지 않습니다"))
                : null;

        S3ImageDelete(req, room);

        room.updateRoom(req, newManager);
        if (req.getKeywordIds() != null) updateRoomKeywords(req, room);
    }

    private void S3ImageDelete(RoomUpdateRequestDto req, Room room) {
        if (req.getRoomImage() != null) {
            String imageUrl = room.getRoomImage();
            if (!imageUrl.equals("default_room_image_letsgo")) {
                s3UploadService.deleteImage(imageUrl, "roomImage/");
            }
        }
    }

    @Transactional
    public void delete(String memberId, Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));

        authorityValidation(room, memberId);

        deleteRoom(room);
    }

    @Transactional
    public void join(RoomJoinRequestDto req, String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));

        permanentRoomRequestValidation(room);
        authorityValidation(room, memberId);
        roomSizeValidation(room);

        Member newMember = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        joinMemberInnerLogic(newMember, room);
    }

    @Transactional
    public void withdraw(String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));

        permanentRoomRequestValidation(room);

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        RoomMember roomMember = roomMemberRepository.findByRoomAndMember(room, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        roomMember.leaveRoom();

        // 방장 나가면 방 삭제되도록 구현함
        if (room.getManager().equals(member))
            deleteRoom(room);
    }

    public Slice<RoomSearchResponseDto> search(RoomSearchRequestDto req, Pageable pageable) {
        return roomRepository.searchDisposableRoom(req, pageable);
    }

    public RoomResponseDto enter(RoomEnterRequestDto req, Long roomId, String memberId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));

        memberJoinValidation(room, member);
        passwordValidation(req, room);
        doubleEnterValidation(memberId);

        RoomResponseDto res = roomRepository.getDetailRoomInfo(roomId);
        customRedisRepository.enterMember(memberId, roomId, LocalDateTime.now());
        List<MemberSimpleResponseDto> currentMembers =
                memberRepository.getCurrentMembers(roomRedisRepository.getMembers(roomId));
        res.setCurrentMembers(currentMembers);
        res.setCurrentMcount(currentMembers.size());

        return res;
    }


    private void doubleEnterValidation(String memberId) {
        if (memberRedisRepository.alreadyInRoom(memberId)){
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "이미 방에 들어있는 유저입니다");
        }
    }

    private void passwordValidation(RoomEnterRequestDto req, Room room) {
        if (room.getIsLocked()){
            if (req.getPassword() == null || !req.getPassword().equals(room.getPassword()))
                throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "방 잠금에 대한 비밀번호가 틀렸습니다");
        }
    }

    private void memberJoinValidation(Room room, Member member) {
        if (room.getType().equals(RoomType.PERMANENT)){
            roomMemberRepository.findByRoomAndMember(room, member)
                    .orElseThrow(() -> new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "가입된 멤버가 아닙니다"));
        }
    }

    public String leave(Long roomId, String memberId){
        // redis 로직
        String enterTimeString = memberRedisRepository.getEnterTime(memberId);
        log.info("enterTimeString : {}", enterTimeString);

        customRedisRepository.leaveMember(memberId, roomId);

        noEnteranceValidation(enterTimeString);
        // 시간이 5초 이내라면 meatadata 만들지 않고 리턴 (테스트 후 5분으로 수정 필요)
        if( durationValidation(enterTimeString) ) return null;

        MetadataCreateDto dto = MetadataCreateDto.builder()
                .memberId(memberId)
                .roomId(roomId)
                .enterTime(DateParser.parse(enterTimeString))
                .leaveTime(LocalDateTime.now())
                .keywords(roomKeywordRepository.getRoomKeywordValuesInString(roomId))
                .build();

        log.info("{} 멤버가 {} 방을 나갔습니다", memberId, roomId);
        return metadataService.create(dto);
    }

    private static void noEnteranceValidation(String enterTimeString) {
        if (enterTimeString == null)
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "유저는 해당 방에 입장한 적이 없습니다");
    }

    private boolean durationValidation(String enterTimeString){
        return Duration.between(DateParser.parse(enterTimeString), LocalDateTime.now()).toSeconds() < 5;
    }


    private void authorityValidation(Room room, String memberId) {
        if (!room.getManager().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "방장이 아닙니다");
    }

    private void permanentRoomRequestValidation(Room room) {
        if (room.getType().equals(RoomType.DISPOSABLE)) throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "지속방이 아닙니다");
    }

    private void roomSizeValidation(Room room) {
        if (room.getMcount() == room.getCapacity()) throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "방 입장 인원이 가득찼습니다");
    }

    private void deleteRoom(Room room){
        // 방과 관련된 엔티티 전부 삭제
        room.delete();
        Set<String> currentMemberId = roomRedisRepository.getMembers(room.getId());
        for (String memberId : currentMemberId) {
            log.info("{}", memberId);
            leave(room.getId(), memberId);
        }
        roomRedisRepository.deleteAll(room.getId());
        roomKeywordRepository.deleteAll();
    }


    private void joinMemberInnerLogic(Member member, Room room){
        RoomMember roomMember = new RoomMember(member, room);
        alreadyJoinedValidation(member, room);
        roomMemberRepository.save(roomMember);
        roomMember.joinRoom();
    }

    private void alreadyJoinedValidation(Member member, Room room) {
        if (roomMemberRepository.existsByRoomAndMember(room, member)) // 최적화 가능
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "이미 방에 가입되어있습니다");
    }

    private void updateRoomKeywords(RoomUpdateRequestDto req, Room room){
        Set<Long> newSet = new HashSet<Long>(req.getKeywordIds());
        Set<Long> oldSet = room.getRoomKeywords().stream().map(r -> r.getKeyword().getId()).collect(Collectors.toSet());

        // 새로 추가된 키워드 저장
        Set<Long> pureNewSet = new HashSet<>(newSet);
        pureNewSet.removeAll(oldSet);
        log.info("newSet : {}", newSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        log.info("oldSet : {}", oldSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        log.info("pureNewSet : {}", pureNewSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        for (Long id : pureNewSet) {
            roomKeywordRepository.save(new RoomKeyword(room, keywordRepository.findById(id).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_KEYWORD))));
        }

        // 제외된 키워드 삭제
        Set<Long> pureOldSet = new HashSet<>(oldSet);
        pureOldSet.removeAll(newSet);
        log.info("pureOldSet : {}", pureOldSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        for (Long id : pureOldSet) {
            roomKeywordRepository.deleteByRoomIdAndKeywordId(room.getId(), id);
        }
    }

}
