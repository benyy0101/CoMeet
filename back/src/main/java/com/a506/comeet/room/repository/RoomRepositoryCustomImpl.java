package com.a506.comeet.room.repository;

import com.a506.comeet.room.controller.dto.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.room.entity.QRoom.room;
import static com.a506.comeet.member.entity.QMember.member;
import static com.a506.comeet.room.entity.QRoomMember.roomMember;
import static com.a506.comeet.room.entity.QChannel.channel;
import static com.a506.comeet.room.entity.QLounge.lounge;

@RequiredArgsConstructor
@Repository
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<RoomSearchResponseDto> findRoomCustom(RoomSearchRequestDto req, Pageable pageable) {
        List<RoomSearchResponseDto> content = jpaQueryFactory.select(Projections.constructor(RoomSearchResponseDto.class,
                        room.id,
                        member.memberId,
                        member.nickname,
                        room.title,
                        room.description,
                        room.link,
                        room.roomImage,
                        room.mcount,
                        room.capacity,
                        room.isLocked,
                        room.password,
                        room.constraints,
                        room.type)).
                from(room)
                .innerJoin(member)
                .on(room.manager.memberId.eq(member.memberId))
                .where(makeBooleanBuilder(req)).
                orderBy(makeOrder(req)).
                offset(pageable.getOffset()).
                limit(pageable.getPageSize()+1). // 1개를 더 가져온다
                fetch();

        boolean hasNext = content.size() > pageable.getPageSize(); // 뒤에 더 있는지 확인
        content = hasNext ? content.subList(0, pageable.getPageSize()) : content; // 뒤에 더 있으면 1개 더 가져온거 빼고 넘긴다
        return new SliceImpl<>(content, pageable, hasNext);
    }

    @Override
    public RoomResponseDto enterRoomCustom(Long roomId) {
        List<RoomResponseDto> res = jpaQueryFactory.select(Projections.constructor(RoomResponseDto.class,
                room.id,
                member.memberId,
                member.nickname,
                room.title,
                room.description,
                room.link,
                room.roomImage,
                room.mcount,
                room.capacity,
                room.isLocked,
                room.password,
                room.constraints,
                room.type,
                Projections.list(
                        Projections.constructor(RoomMemberResponseDto.class,
                                roomMember.member.memberId,
                                roomMember.member.nickname,
                                roomMember.member.profileImage,
                                roomMember.member.feature
                        )
                ),
                Projections.list(
                        Projections.constructor(RoomLoungeResponseDto.class,
                                lounge.id,
                                lounge.name
                        )
                ),
                Projections.list(
                        Projections.constructor(RoomChannelResponseDto.class,
                                channel.id,
                                channel.name
                        )
                ))).
                from(room).
                innerJoin(room.lounges, lounge).
                innerJoin(room.channels, channel).
                join(roomMember).on(roomMember.room.eq(room)).
                innerJoin(member).on(roomMember.member.eq(member)).
                where(room.id.eq(roomId)).fetch();
        return res.isEmpty() ? null : res.get(0);
    }

    private <T> OrderSpecifier<?> makeOrder(RoomSearchRequestDto req){
        ComparableExpressionBase<?> path = switch (req.getSortBy()) {
            case mcount -> room.mcount;
            case capacity -> room.capacity;
            case createdAt -> room.createdAt;
            default -> throw new IllegalArgumentException("invalud sort field");
        };
        return req.getIsDesc() ? path.desc() : path.asc();
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
