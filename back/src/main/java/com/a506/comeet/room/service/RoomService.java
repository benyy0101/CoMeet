package com.a506.comeet.room.service;

import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.member.repository.MemberRepository;
import com.a506.comeet.room.controller.RoomCreateRequestDto;
import com.a506.comeet.room.controller.RoomJoinRequestDto;
import com.a506.comeet.room.controller.RoomUpdateRequestDto;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMember;
import com.a506.comeet.room.repository.RoomMemberRepository;
import com.a506.comeet.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
@Validated
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
    public void updateRoom(RoomUpdateRequestDto req, long roomId) {
        Room room = roomRepository.findById(roomId).get();
        room.updateRoom(req);
        room.setManager(memberRepository.findById(req.getMangerId()).get());
        roomRepository.save(room);
    }

    @Transactional
    public void deleteRoom(Long id){
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        room.deleteSoftly();
    }

    @Transactional
    public void joinMember(RoomJoinRequestDto req, long roomId) {
        Room room = roomRepository.findById(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE.get())) return;

        Member member = memberRepository.findById(req.getMemberId()).get();
        RoomMember roomMember = new RoomMember(member, room);
    }

    @Transactional
    public void leaveMember(String memberId, long roomId) {
        Room room = roomRepository.findById(roomId).get();
        if (room.getType().equals(RoomType.DISPOSABLE.get())) return;

        Member member = memberRepository.findById(memberId).get();
        RoomMember roomMember = new RoomMember(member, room);
        roomMember.leaveRoom();
    }
}
