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
    public Room createRoom(RoomCreateRequestDto req) {
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Room room = Room.builder(). //.위치
                manager(member).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        Room created = roomRepository.save(room);
        for (Long keywordId : req.getKeywordIds()) {
            Keyword keyword = keywordRepository.findByIdAndIsDeletedFalse(keywordId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
            RoomKeyword roomKeyword = roomKeywordRepository.save(new RoomKeyword(created, keyword));
            room.addKeyword(roomKeyword);
        }
        if (req.getType().equals(RoomType.PERMANENT))
            joinMemberInnerLogic(member, created);
        return created;
    }

    @Transactional
    public void updateRoom(RoomUpdateRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(room, reqMemberId);
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        room.updateRoom(req, member);
        updateRoomKeywords(req, room);
    }

    @Transactional
    public void deleteRoom(String reqMemberId, Long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if (!room.getManager().getMemberId().equals(reqMemberId)) //중복
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
        room.delete();
    }

    @Transactional
    public void joinMember(RoomJoinRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        authorityValidation(room, reqMemberId);
        roomSizeValidation(room);
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMemberId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        // 실제 멤버 조인 로직
        joinMemberInnerLogic(member, room);
    }

    @Transactional
    public void leaveRoom(String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(reqMemberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        RoomMember roomMember = roomMemberRepository.findByRoomAndMemberAndIsDeletedFalse(room, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        roomMember.leaveRoom();
    }

    public Slice<RoomSearchResponseDto> searchRoom(RoomSearchRequestDto requestDto) {
        return roomRepository.searchRoomCustom(requestDto, PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize()));
    }

    public RoomResponseDto enterRoom(Long roomId, String memberId) {
        roomRepository.findMemberByRoomIdAndMemberId(roomId, memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_AUTHORIZATION));
        return roomRepository.enterRoomCustom(roomId);
    }

    private void authorityValidation(Room room, String reqMemberId) {
        if (!room.getManager().getMemberId().equals(reqMemberId))
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
