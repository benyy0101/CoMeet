package com.a506.comeet.room.repository;

import com.a506.comeet.room.controller.RoomSearchRequestDto;
import com.a506.comeet.room.controller.RoomSearchResponseDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.List;

import static com.a506.comeet.room.entity.QRoom.room;
import static com.a506.comeet.member.entity.QMember.member;

@RequiredArgsConstructor
@Repository
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<RoomSearchResponseDto> findRoomCustom(RoomSearchRequestDto req) {
        JPAQuery<RoomSearchResponseDto> query = jpaQueryFactory.select(Projections.constructor(RoomSearchResponseDto.class,
                        room.id,
                        member.memberId,
                        member.nickname,
                        room.title,
                        room.description,
                        room.url,
                        room.roomImage,
                        room.mcount,
                        room.capacity,
                        room.isLocked,
                        room.password,
                        room.constraints,
                        room.type)).
                from(room)
                .innerJoin(member)
                .on(room.manager.memberId.eq(member.memberId));

        return query.where(makeBooleanBuilder(req)).fetch();
    }

    private BooleanBuilder makeBooleanBuilder(RoomSearchRequestDto req){
        BooleanBuilder builder = new BooleanBuilder();

        if (req.getSearchKeyword() != null) {
            builder.andAnyOf(
                    room.title.contains(req.getSearchKeyword()),
                    room.description.contains(req.getSearchKeyword())
            );
        }
        if (req.getIsLocked() != null)
            builder.and(room.isLocked.eq(req.getIsLocked()));
        if (req.getMinMcount() != null || req.getMaxMcount() != null) {
            builder.and(room.mcount.between(req.getMinMcount(), req.getMaxMcount()));
        }
        if (req.getMinCapacity() != null || req.getMaxCapacity() != null) {
            builder.and(room.capacity.between(req.getMinCapacity(), req.getMaxCapacity()));
        }
        if (req.getConstraints() != null && !req.getConstraints().isEmpty())
            builder.and(room.constraints.in(req.getConstraints()));
        if (req.getType() != null)
            builder.and(room.type.eq(req.getType()));

        return builder;
    }
}
