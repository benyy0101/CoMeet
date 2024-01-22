package com.a506.comeet.room.repository;


import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomMemberRepository extends JpaRepository<RoomMember, Long> {

    Optional<RoomMember> findByRoomAndMemberAndIsDeletedFalse(Room room, Member member);

    boolean existsByRoomAndMember(Room room, Member member);
}
