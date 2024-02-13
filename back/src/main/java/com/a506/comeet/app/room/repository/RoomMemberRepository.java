package com.a506.comeet.app.room.repository;


import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.entity.RoomMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomMemberRepository extends JpaRepository<RoomMember, Long>, RoomMemberRepositoryCustom {

    Optional<RoomMember> findByRoomAndMember(Room room, Member member);

    boolean existsByRoomAndMember(Room room, Member member);
}
