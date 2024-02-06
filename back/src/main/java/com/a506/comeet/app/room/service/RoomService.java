package com.a506.comeet.app.room.service;

import com.a506.comeet.common.util.DateParser;
import com.a506.comeet.common.util.KeyUtil;
import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.repository.RoomKeywordRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.entity.RoomMember;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.metadata.repository.MemberRedisRepository;
import com.a506.comeet.metadata.repository.RoomRedisRepository;
import com.a506.comeet.metadata.service.MetadataCreateDto;
import com.a506.comeet.metadata.service.MetadataService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
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

    private final MemberRedisRepository memberRedisRepository;
    private final RoomRedisRepository roomRedisRepository;

    private final MetadataService metadataService;

    private final ObjectMapper mapper;

    @Transactional
    public Room create(RoomCreateRequestDto req) {
        Member member = memberRepository.findById(req.getManagerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Room room = Room.builder().
                manager(member).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        Room created = roomRepository.save(room);

        // 키워드 저장
        if (req.getKeywordIds() != null){
            for (Long keywordId : req.getKeywordIds()) {
                Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
                RoomKeyword roomKeyword = roomKeywordRepository.save(new RoomKeyword(created, keyword));
                room.addKeyword(roomKeyword);
            }
        }

        // 지속방이면 방장을 해당 방에 가입
        if (req.getType() != null && req.getType().equals(RoomType.PERMANENT))
            joinMemberInnerLogic(member, created);

        return created;
    }

    @Transactional
    public void update(RoomUpdateRequestDto req, String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "해당 방이 존재하지 않습니다"));
        // 해당 요청을 방장이 요청했는지 확인
        authorityValidation(room, memberId);
        Member newManager = req.getMangerId() != null?
                memberRepository.findById(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "변경 요청한 새로운 매니저 아이디가 서비스 내에 존재하지 않습니다"))
                : null;
        room.updateRoom(req, newManager);
        if (req.getKeywordIds() != null) updateRoomKeywords(req, room);
    }

    @Transactional
    public void delete(String memberId, Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        // 해당 요청을 방장이 요청했는지 확인
        authorityValidation(room, memberId);

        if (!room.getManager().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
        room.delete();
    }

    @Transactional
    public void join(RoomJoinRequestDto req, String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        authorityValidation(room, memberId);
        roomSizeValidation(room);
        Member newMember = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        // 실제 멤버 조인 로직
        joinMemberInnerLogic(newMember, room);
    }

    @Transactional
    public void withdraw(String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        RoomMember roomMember = roomMemberRepository.findByRoomAndMember(room, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        roomMember.leaveRoom();

        // 방장 나가면 그냥 삭제되도록 구현함
        if (room.getManager().equals(member))
            room.delete();
    }

    public Slice<RoomSearchResponseDto> search(RoomSearchRequestDto req, Pageable pageable) {
        return roomRepository.searchRoomCustom(req, pageable);
    }

    // 방 들어가는 로직 때문에 Transactional
    @Transactional
    public RoomResponseDto enter(RoomEnterRequestDto req, Long roomId, String memberId) {
        Room room = roomRepository.findById(roomId).orElseThrow();

        // 방이 지속방이라면 방에 가입된 멤버인지 확인
        memberJoinValidation(roomId, memberId, room);
        // 방이 잠금이라면 비밀번호를 확인하고, 비밀번호가 없거나 틀렸다면 해당 방 멤버인지 확인
        passwordValidation(req, room);
        // 이미 방에 들어있는지 확인
        doubleEnterValidation(memberId);

        // 현재 멤버가 어디에 있고, 언제 들어갔는지 저장
        memberRedisRepository.save(KeyUtil.getCurrentMemberKey(memberId), roomId, LocalDateTime.now());
        // 현재 어떤방에 어떤 멤버가 들어왔는지 저장
        roomRedisRepository.add(KeyUtil.getRoomKey(roomId), memberId);

        RoomResponseDto res = roomRepository.enterRoomCustom(roomId);
        res.setCurrentMcount(roomRedisRepository.count(KeyUtil.getRoomKey(roomId)));
        return res;
    }

    private void doubleEnterValidation(String memberId) {
        if (memberRedisRepository.findCurrentRoom(KeyUtil.getCurrentMemberKey(memberId))){
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "이미 방에 들어있는 유저입니다");
        }
    }

    private void passwordValidation(RoomEnterRequestDto req, Room room) {
        if (room.getIsLocked()){
            if (req.getPassword() == null || !req.getPassword().equals(room.getPassword()))
                throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "방 잠금에 대한 비밀번호가 틀렸습니다");
        }
    }

    private void memberJoinValidation(Long roomId, String memberId, Room room) {
        if (room.getType().equals(RoomType.PERMANENT)){
            roomRepository.findMemberByRoomIdAndMemberId(roomId, memberId)
                    .orElseThrow(() -> new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "가입된 멤버가 아닙니다"));
        }
    }

    @Transactional
    public String leave(RoomLeaveRequestDto req, Long roomId, String memberId){
        // 현재 유저의 시간 정보를 추출하고 위치정보와 시간정보를 삭제
        String enterTimeString = memberRedisRepository.delete(KeyUtil.getCurrentMemberKey(memberId));
        // 해당 방 들어있는 유저정보에서 유저를 삭제
        roomRedisRepository.delete(KeyUtil.getRoomKey(roomId), memberId);
        // 해당 유저가 방에 입장한 적이 없으면 잘못된 요청
        if (enterTimeString == null) throw new RestApiException(CommonErrorCode.WRONG_REQUEST);
        // 시간이 5초 이내라면 meatadata 만들지 않고 리턴 (테스트 후 5분으로 수정 필요)
        if( !durationValidation(enterTimeString) ) return null;

        MetadataCreateDto dto = MetadataCreateDto.builder()
                .memberId(memberId)
                .roomId(roomId)
                .enterTime(DateParser.parse(enterTimeString))
                .leaveTime(LocalDateTime.now())
                .keywords(req.getKeywords())
                .build();

        return metadataService.create(dto);
    }

    private boolean durationValidation(String enterTimeString){
        return Duration.between(DateParser.parse(enterTimeString), LocalDateTime.now()).toSeconds() >= 5;
    }


    private void authorityValidation(Room room, String memberId) {
        if (!room.getManager().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
    }

    private void permanentRoomRequestValidation(Room room) {
        if (room.getType().equals(RoomType.DISPOSABLE)) throw new RestApiException(CommonErrorCode.WRONG_REQUEST);
    }

    private void roomSizeValidation(Room room) {
        if (room.getMcount() == room.getCapacity()) throw new RestApiException(CommonErrorCode.WRONG_REQUEST);
    }


    private void joinMemberInnerLogic(Member member, Room room){
        RoomMember roomMember = new RoomMember(member, room);
        if (roomMemberRepository.existsByRoomAndMember(room, member)) // 최적화 가능
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        roomMemberRepository.save(roomMember);
        roomMember.joinRoom();
    }

    private void updateRoomKeywords(RoomUpdateRequestDto req, Room room){
        Set<Long> newSet = new HashSet<Long>(req.getKeywordIds());
        Set<Long> oldSet = room.getRoomKeywords().stream().map(r -> r.getKeyword().getId()).collect(Collectors.toSet());
        Set<Long> pureNewSet = new HashSet<>(newSet);
        pureNewSet.removeAll(oldSet);
        log.info("newSet : {}", newSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        log.info("oldSet : {}", oldSet.stream().map(Objects::toString).collect(Collectors.joining(",")));
        log.info("pureNewSet : {}", pureNewSet.stream().map(Objects::toString).collect(Collectors.joining(",")));

        // 새로 추가된 키워드 저장
        for (Long id : pureNewSet) {
            roomKeywordRepository.save(new RoomKeyword(room, keywordRepository.findById(id).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND))));
        }

        Set<Long> pureOldSet = new HashSet<>(oldSet);
        pureOldSet.removeAll(newSet);
        log.info("pureOldSet : {}", pureOldSet.stream().map(Objects::toString).collect(Collectors.joining(",")));

        // 이외 키워드 삭제
        for (Long id : pureOldSet) {
            roomKeywordRepository.deleteByRoomIdAndKeywordId(room.getId(), id);
        }
    }

    // // 이 메소드는 주어진 roomId가 모든 keywordIds를 포함하는지 확인합니다.
    // public boolean roomContainsAllKeywords(Long roomId, List<Long> keywordIds) {
    //     // roomId에 대한 모든 RoomKeyword를 조회
    //     List<RoomKeyword> roomKeywords = roomKeywordRepository.findByRoomId(roomId);
    //
    //     System.out.println("=====================");
    //     System.out.println(roomKeywords);
    //     System.out.println("=====================");
    //
    //     // 조회된 RoomKeyword에서 Keyword ID만 추출
    //     Set<Long> roomKeywordIds = roomKeywords.stream()
    //         .map(roomKeyword -> roomKeyword.getKeyword().getId())
    //         .collect(Collectors.toSet());
    //
    //     // 주어진 keywordIds가 roomKeywordIds에 모두 포함되어 있는지 확인
    //     return roomKeywordIds.containsAll(keywordIds);
    // }
}
