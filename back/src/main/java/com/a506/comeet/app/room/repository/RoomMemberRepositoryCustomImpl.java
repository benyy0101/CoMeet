package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.RoomSimpleResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.app.room.entity.QRoom.room;
import static com.a506.comeet.app.room.entity.QRoomMember.roomMember;

@Repository
@RequiredArgsConstructor
public class RoomMemberRepositoryCustomImpl implements RoomMemberRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<RoomSimpleResponseDto> getJoinedRooms(String memberId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomSimpleResponseDto.class,
                                room.id,
                                room.title,
                                room.roomImage)
                )
                .from(roomMember)
                .innerJoin(roomMember.room, room)
                .where(roomMember.member.memberId.eq(memberId))
                .fetch();
    }
}
