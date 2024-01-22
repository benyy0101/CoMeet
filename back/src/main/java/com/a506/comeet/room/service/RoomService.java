package com.a506.comeet.room.service;

import com.a506.comeet.common.enums.RoomType;
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
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        Room room = Room.builder().
                manager(memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).get()).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        return roomRepository.save(room);
    }

    @Transactional
    public boolean updateRoom(RoomUpdateRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).get();
        if (room.isDeleted()) return false;
        if (!room.getManager().getMemberId().equals(reqMemberId)) return false;
        room.updateRoom(req, memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).get());
        try {
            roomRepository.save(room);
            return true;
        } catch (JpaSystemException e){
            return false;
        }

    }

    @Transactional
    public boolean deleteRoom(String reqMemberId, Long roomId){
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        if (!room.getManager().getMemberId().equals(reqMemberId)) return false;
        room.delete();
        return true;
    }

    @Transactional
    public boolean joinMember(RoomJoinRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE)) return false;
        if (!room.getManager().getMemberId().equals(reqMemberId)) return false;

        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMemberId()).get();

        RoomMember roomMember = new RoomMember(member, room);
        if(roomMemberRepository.existsByRoomAndMember(room, member)) return false;
        try {
            roomMemberRepository.save(roomMember);
            roomMember.joinRoom();
            return true;
        } catch (JpaSystemException e){
            return false;
        }
    }

    @Transactional
    public boolean leaveRoom(String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE)) return false;
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(reqMemberId).get();

        RoomMember roomMember = roomMemberRepository.findByRoomAndMember(room, member).get();
        roomMember.leaveRoom();
        roomMemberRepository.delete(roomMember);
        return true;
    }

    public Slice<RoomSearchResponseDto> searchRoom(RoomSearchRequestDto requestDto){
        return roomRepository.findRoomCustom(requestDto, PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize()));
    }

    public RoomResponseDto enterRoom(Long roomId, String memberId) {
        // 사용자 정보 확인 로직 -> 해당 사용자가 방에 가입되어있는지 확인 -> 던져!
        roomRepository.findMemberByRoomIdAndMemberId(roomId, memberId).orElseThrow();
        return roomRepository.enterRoomCustom(roomId);
    }
}
