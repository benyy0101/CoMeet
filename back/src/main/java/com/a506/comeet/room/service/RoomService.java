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
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(req.getMangerId()).get();
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
    public boolean updateRoom(RoomUpdateRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).orElseGet(null);
        if (room == null) return false;
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

    public List<RoomResponseDto> enterRoom(Long roomId) {
        return roomRepository.enterRoomCustom(roomId);
    }
}
