package com.a506.comeet.room.repository;


import com.a506.comeet.room.entity.RoomMember;
import com.a506.comeet.room.entity.RoomMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomMemberRepository extends JpaRepository<RoomMember, RoomMemberId> {
}
