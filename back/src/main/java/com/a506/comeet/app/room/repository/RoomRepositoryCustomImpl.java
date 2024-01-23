package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.*;

import static com.a506.comeet.app.room.entity.QRoom.room;
import static com.a506.comeet.app.member.entity.QMember.member;
import static com.a506.comeet.app.room.entity.QRoomMember.roomMember;
import static com.a506.comeet.app.room.entity.QChannel.channel;
import static com.a506.comeet.app.room.entity.QLounge.lounge;
import static com.a506.comeet.app.keyword.entity.QKeyword.keyword;
import static com.a506.comeet.app.keyword.entity.QRoomKeyword.roomKeyword;

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
                        room.type)).distinct().
                from(room)
                .innerJoin(member).on(room.manager.memberId.eq(member.memberId))
                .leftJoin(roomKeyword).on(roomKeyword.room.eq(room))
                .leftJoin(keyword).on(roomKeyword.keyword.eq(keyword))
                .where(
                        eqKeyword(req.getSearchKeyword()),
                        isLocked(req.getIsLocked()),
                        eqConstraints(req.getConstraints()),
                        eqKeywordIds(req.getKeywordIds()),
                        eqType(req.getType()),
                        btwMcount(req.getMinMcount(), req.getMaxMcount()),
                        btwCapacity(req.getMinCapacity(), req.getMaxCapacity()))
//                .groupBy(room.id)  // group by를 사용하여 중복된 room.id를 제거
                .orderBy(makeOrder(req)).
                offset(pageable.getOffset()).
                limit(pageable.getPageSize() + 1). // 1개를 더 가져온다
                        fetch();

        boolean hasNext = content.size() > pageable.getPageSize(); // 뒤에 더 있는지 확인
        content = hasNext ? content.subList(0, pageable.getPageSize()) : content; // 뒤에 더 있으면 1개 더 가져온거 빼고 넘긴다
        return new SliceImpl<>(content, pageable, hasNext);
    }



    @Override
    public RoomResponseDto enterRoomCustom(Long roomId) {
        RoomResponseDto res = jpaQueryFactory.select(
                        Projections.constructor(RoomResponseDto.class,
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
                                room.type
                        )
                ).
                from(room).
                leftJoin(room.roomMembers, roomMember).
                leftJoin(roomMember.member, member).
                where(room.id.eq(roomId).and(room.manager.eq(member))).fetchOne();

        res.setMembers(getMembers(roomId));
        res.setLounges(getLounges(roomId));
        res.setChannels(getChannels(roomId));
        return res;
    }

    @Override
    public Optional<String> findMemberByRoomIdAndMemberId(Long roomId, String memberId){
        return Optional.ofNullable(jpaQueryFactory.select(member.memberId)
                .from(room)
                .innerJoin(member).on(room.manager.eq(member))
                .where(room.id.eq(roomId).and(member.memberId.eq(memberId))).fetchOne());
    }

    @Override
    public List<RoomResponseDto> enterRoomCustomOneQuery(Long roomId) {
        List<RoomResponseDto> res = jpaQueryFactory.select(
                        Projections.constructor(RoomResponseDto.class,
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
                                        Projections.constructor(
                                                RoomMemberResponseDto.class,
                                                roomMember.member.memberId,
                                                roomMember.member.nickname,
                                                roomMember.member.profileImage,
                                                roomMember.member.feature
                                        )
                                ),
                                Projections.list(
                                        Projections.constructor(
                                                RoomChannelResponseDto.class,
                                                channel.id,
                                                channel.name
                                        )
                                ),
                                Projections.list(
                                        Projections.constructor(
                                                RoomLoungeResponseDto.class,
                                                lounge.id,
                                                lounge.name
                                        )
                                )
                        )
                ).
                from(room).
                leftJoin(room.roomMembers, roomMember).
                leftJoin(roomMember.member, member).
                leftJoin(room.lounges, lounge).
                leftJoin(room.channels, channel).
                where(room.id.eq(roomId)).fetch();

        return res;
    }

    private List<RoomMemberResponseDto> getMembers(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomMemberResponseDto.class,
                                roomMember.member.memberId,
                                roomMember.member.nickname,
                                roomMember.member.profileImage,
                                roomMember.member.feature
                        )).
                from(room).
                leftJoin(room.roomMembers, roomMember).
                leftJoin(roomMember.member, member).
                where(room.id.eq(roomId)).fetch();
    }

    private List<RoomLoungeResponseDto> getLounges(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomLoungeResponseDto.class,
                                lounge.id,
                                lounge.name
                        )).
                from(room).
                leftJoin(room.lounges, lounge).
                where(room.id.eq(roomId)).fetch();
    }

    private List<RoomChannelResponseDto> getChannels(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomChannelResponseDto.class,
                                channel.id,
                                channel.name
                        )).
                from(room).
                leftJoin(room.channels, channel).
                where(room.id.eq(roomId)).fetch();
    }

    private List<RoomResponseDto> mergeResults(List<Tuple> results) {
        Map<Long, RoomResponseDto> roomMap = new LinkedHashMap<>();

        for (Tuple tuple : results) {
            RoomResponseDto roomResponseDto = tuple.get(0, RoomResponseDto.class);
            List<RoomMemberResponseDto> members = tuple.get(1, List.class);
            List<RoomLoungeResponseDto> lounges = tuple.get(2, List.class);
            List<RoomChannelResponseDto> channels = tuple.get(3, List.class);

            roomResponseDto.setMembers(members);
            roomResponseDto.setLounges(lounges);
            roomResponseDto.setChannels(channels);

            roomMap.put(roomResponseDto.getRoomId(), roomResponseDto);
        }

        return new ArrayList<>(roomMap.values());
    }

    private <T> OrderSpecifier<?> makeOrder(RoomSearchRequestDto req) {
        ComparableExpressionBase<?> path = switch (req.getSortBy()) {
            case mcount -> room.mcount;
            case capacity -> room.capacity;
            case createdAt -> room.createdAt;
            default -> throw new IllegalArgumentException("invalud sort field");
        };
        return req.getIsDesc() ? path.desc() : path.asc();
    }

//    private BooleanBuilder makeBooleanBuilder(RoomSearchRequestDto req) {
//        BooleanBuilder builder = new BooleanBuilder();
//
//        if (req.getSearchKeyword() != null) {
//            builder.andAnyOf(
//                    room.title.contains(req.getSearchKeyword()),
//                    room.description.contains(req.getSearchKeyword())
//            );
//        }
//        if (req.getIsLocked() != null)
//            builder.and(room.isLocked.eq(req.getIsLocked()));
//        if (req.getMinMcount() != null || req.getMaxMcount() != null) {
//            builder.and(room.mcount.between(req.getMinMcount(), req.getMaxMcount()));
//        }
//        if (req.getMinCapacity() != null || req.getMaxCapacity() != null) {
//            builder.and(room.capacity.between(req.getMinCapacity(), req.getMaxCapacity()));
//        }
//        if (req.getConstraints() != null && !req.getConstraints().isEmpty())
//            builder.and(room.constraints.in(req.getConstraints()));
//        if (req.getType() != null)
//            builder.and(room.type.eq(req.getType()));
//        if (req.getKeywordIds() != null && req.getKeywordIds().size() > 0){
//            builder.and(roomKeyword.keyword.id.in(req.getKeywordIds()));
//        }
//
//        return builder;
//    }

    private BooleanExpression eqKeyword(String keyword){
        if(StringUtils.isEmpty(keyword)) return null;
        return room.title.contains(keyword)
                .or(room.description.contains(keyword));
    }

    private BooleanExpression isLocked(Boolean isLocked){
        if(isLocked == null) return null;
        return room.isLocked.eq(isLocked);
    }

    private BooleanExpression btwMcount(Integer min, Integer max){
        if(min == null && max == null) return null;
        if (min == null) return room.mcount.lt(max);
        if (max == null) return room.mcount.gt(min);
        return room.mcount.between(min, max);
    }

    private BooleanExpression btwCapacity(Integer minCapacity, Integer maxCapacity){
        if(minCapacity == null && maxCapacity == null) return null;
        if (minCapacity == null) return room.capacity.lt(maxCapacity);
        if (maxCapacity == null) return room.capacity.gt(minCapacity);
        return room.capacity.between(minCapacity, maxCapacity);
    }

    private BooleanExpression eqConstraints(List<RoomConstraints> constraints){
        if(constraints == null || constraints.isEmpty()) return null;
        return room.constraints.in(constraints);
    }

    private BooleanExpression eqType(RoomType type){
        if(type == null) return null;
        return room.type.eq(type);
    }

    private BooleanExpression eqKeywordIds(List<Long> keywordIds){
        if(keywordIds == null || keywordIds.isEmpty()) return null;
        return roomKeyword.keyword.id.in(keywordIds);
    }


}
