package com.a506.comeet.room.service;

import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.member.repository.MemberRepository;
import com.a506.comeet.room.controller.*;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMember;
import com.a506.comeet.room.entity.RoomMemberId;
import com.a506.comeet.room.repository.RoomMemberRepository;
import com.a506.comeet.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

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
                manager(memberRepository.findById(req.getMangerId()).get()).
                title(req.getTitle()).
                description(req.getDescription()).
                capacity(req.getCapacity()).
                constraints(req.getConstraints()).
                type(req.getType()).link("임시 Link, 추후 구현 필요").build();

        return roomRepository.save(room);
    }

    @Transactional
    public boolean updateRoom(RoomUpdateRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findById(roomId).get();
        if (room.getManager().getMemberId() != reqMemberId) return false;
        room.updateRoom(req, memberRepository.findById(req.getMangerId()).get());

        try {
            roomRepository.save(room);
            return true;
        } catch (JpaSystemException e){
            return false;
        }

    }

    @Transactional
    public boolean deleteRoom(String reqMemberId, Long roomId){
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        if (!room.getManager().getMemberId().equals(reqMemberId)) return false;
        room.deleteSoftly();
        return true;
    }

    @Transactional
    public boolean joinMember(RoomJoinRequestDto req, String reqMemberId, long roomId) {
        Room room = roomRepository.findById(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE)) return false;
        if (!room.getManager().getMemberId().equals(reqMemberId)) return false;

        Member member = memberRepository.findById(req.getMemberId()).get();
        RoomMember roomMember = new RoomMember(member, room);

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
        Room room = roomRepository.findById(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE)) return false;

        RoomMember roomMember = roomMemberRepository.findById(new RoomMemberId(reqMemberId, roomId)).get();
        roomMemberRepository.delete(roomMember);
        roomMember.leaveRoom();
        return true;
    }

    public Slice<RoomSearchResponseDto> searchRoom(RoomSearchRequestDto requestDto){
        return roomRepository.findRoomCustom(requestDto, PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize()));
    }
}
