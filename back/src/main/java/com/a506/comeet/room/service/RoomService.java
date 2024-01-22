package com.a506.comeet.room.service;

import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.member.repository.MemberRepository;
import com.a506.comeet.room.controller.dto.*;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMember;
import com.a506.comeet.room.repository.RoomMemberRepository;
import com.a506.comeet.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    private final RoomMemberRepository roomMemberRepository;

    @Transactional
    public Room createRoom(RoomCreateRequestDto req) {
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Room room = Room.builder().
                manager(member).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        Room created = roomRepository.save(room);
        joinMember(new RoomJoinRequestDto(req.getMangerId()), req.getMangerId(), created.getId());
        return created;
    }

    @Transactional
    public void updateRoom(RoomUpdateRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(room, reqMemberId);
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        room.updateRoom(req, member);
        roomRepository.save(room);
    }

    @Transactional
    public void deleteRoom(String reqMemberId, Long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if (!room.getManager().getMemberId().equals(reqMemberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
        room.delete();
    }

    @Transactional
    public void joinMember(RoomJoinRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        authorityValidation(room, reqMemberId);

        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMemberId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        RoomMember roomMember = new RoomMember(member, room);
        if (roomMemberRepository.existsByRoomAndMember(room, member))
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        roomMemberRepository.save(roomMember);
        roomMember.joinRoom();
    }

    @Transactional
    public void leaveRoom(String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        permanentRoomRequestValidation(room);
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(reqMemberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        RoomMember roomMember = roomMemberRepository.findByRoomAndMember(room, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        roomMember.leaveRoom();
        roomMemberRepository.delete(roomMember);
    }

    public Slice<RoomSearchResponseDto> searchRoom(RoomSearchRequestDto requestDto) {
        return roomRepository.findRoomCustom(requestDto, PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize()));
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
}
