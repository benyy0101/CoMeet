package com.a506.comeet.app.room.service;

import com.a506.comeet.app.keyword.repository.RoomKeywordRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.entity.RoomMember;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
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

    @Transactional
    public Room create(RoomCreateRequestDto req) {
        Member member = memberRepository.findById(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Room room = Room.builder().
                manager(member).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        Room created = roomRepository.save(room);
        if (req.getKeywordIds() != null){
            for (Long keywordId : req.getKeywordIds()) {
                Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
                RoomKeyword roomKeyword = roomKeywordRepository.save(new RoomKeyword(created, keyword));
                room.addKeyword(roomKeyword);
            }
        }
        if (req.getType() != null && req.getType().equals(RoomType.PERMANENT))
            joinMemberInnerLogic(member, created);
        return created;
    }

    @Transactional
    public void update(RoomUpdateRequestDto req, String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(room, memberId);
        Member newManager = req.getMangerId() != null?
                memberRepository.findById(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND))
                : null;
        room.updateRoom(req, newManager);
        if (req.getKeywordIds() != null) updateRoomKeywords(req, room);
    }

    @Transactional
    public void delete(String memberId, Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
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
    public void leave(String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        RoomMember roomMember = roomMemberRepository.findByRoomAndMember(room, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        roomMember.leaveRoom();

        // 방장 나가면 그냥 삭제되도록 구현함
        if (room.getManager().equals(member))
            room.delete();
    }

    public Slice<RoomSearchResponseDto> search(RoomSearchRequestDto requestDto) {
        return roomRepository.searchRoomCustom(requestDto, PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize()));
    }

    public RoomResponseDto enter(Long roomId, String memberId) {
        roomRepository.findMemberByRoomIdAndMemberId(roomId, memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_AUTHORIZATION));
        return roomRepository.enterRoomCustom(roomId);
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
        Set<Long> oldSet = room.getRoomKeywords().stream().map(RoomKeyword::getId).collect(Collectors.toSet());
        Set<Long> pureNewSet = new HashSet<>(newSet);
        pureNewSet.removeAll(oldSet);
        for (Long id : pureNewSet) {
            roomKeywordRepository.save(new RoomKeyword(room, keywordRepository.findByIdAndIsDeletedFalse(id).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND))));
        }
        Set<Long> pureOldSet = new HashSet<>(oldSet);
        pureOldSet.removeAll(newSet);
        for (Long id : pureOldSet) {
            roomKeywordRepository.deleteByRoomAndKeyword(room, keywordRepository.findByIdAndIsDeletedFalse(id).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND)));
        }
    }
}
