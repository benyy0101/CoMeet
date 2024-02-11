package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.app.keyword.entity.QKeyword.keyword;
import static com.a506.comeet.app.keyword.entity.QRoomKeyword.roomKeyword;
import static com.a506.comeet.app.member.entity.QMember.member;
import static com.a506.comeet.app.room.entity.QChannel.channel;
import static com.a506.comeet.app.room.entity.QLounge.lounge;
import static com.a506.comeet.app.room.entity.QRoom.room;
import static com.a506.comeet.app.room.entity.QRoomMember.roomMember;


@RequiredArgsConstructor
@Repository
public class RoomRepositoryCustomImpl implements RoomRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<RoomSearchResponseDto> searchDisposableRoom(RoomSearchRequestDto req, Pageable pageable) {

        List<Room> content = jpaQueryFactory.selectFrom(room)
                .innerJoin(room.manager, member) // member는 1개만 사용됨
                .leftJoin(room.roomKeywords, roomKeyword).fetchJoin()
                .leftJoin(roomKeyword.keyword, keyword).fetchJoin()
                .where(
                        eqType(RoomType.DISPOSABLE),
                        eqKeyword(req.getSearchKeyword()),
                        isLocked(req.getIsLocked()),
                        eqConstraints(req.getConstraints()),
                        eqKeywordIds(req.getKeywordIds()),
                        eqManagerNickname(req.getManagerNickname())
                )
                .orderBy(makeOrder(req))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1) // 1개를 더 가져온다
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize(); // 뒤에 더 있는지 확인
        content = hasNext ? content.subList(0, pageable.getPageSize()) : content; // 뒤에 더 있으면 1개 더 가져온거 빼고 넘긴다

        List<RoomSearchResponseDto> res = content.stream().map(RoomSearchResponseDto::new).toList();

        return new SliceImpl<>(res, pageable, hasNext);
    }

    @Override
    public RoomResponseDto getDetailRoomInfo(Long roomId) {
        RoomResponseDto res = jpaQueryFactory.select(
                        Projections.constructor(
                                RoomResponseDto.class,
                                room.id,
                                member.memberId,
                                member.nickname,
                                room.title,
                                room.description,
                                room.roomImage,
                                room.notice,
                                room.mcount,
                                room.capacity,
                                room.isLocked,
                                room.password,
                                room.constraints,
                                room.type
                        )
                ).
                from(room).
                leftJoin(room.manager, member).
                where(room.id.eq(roomId).and(room.manager.eq(member))).fetchOne();

        if (res == null) return null;

        res.setMembers(getMembers(roomId));
        res.setLounges(getLounges(roomId));
        res.setChannels(getChannels(roomId));
        res.setKeywords(getKeywords(roomId));

        return res;
    }

    @Override
    public List<ManagingRoomResponseDto> getManagingRoom(String memberId) {
        List<Room> rooms = jpaQueryFactory
                .selectFrom(room)
                .where(room.manager.memberId.eq(memberId)
                        .and(room.type.eq(RoomType.PERMANENT)))
                .fetch();
        List<ManagingRoomResponseDto> res = rooms.stream().map(ManagingRoomResponseDto::toDto).toList();
        return res;
    }


    private List<RoomMemberResponseDto> getMembers(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomMemberResponseDto.class,
                                roomMember.member.memberId,
                                roomMember.member.nickname,
                                roomMember.member.profileImage,
                                roomMember.member.feature
                        ))
                .from(roomMember)
                .leftJoin(roomMember.member, member)
                .where(roomMember.room.id.eq(roomId)).fetch();
    }

    private List<RoomKeywordResponseDto> getKeywords(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomKeywordResponseDto.class,
                                keyword.id,
                                keyword.name
                        )).
                from(roomKeyword).
                leftJoin(roomKeyword.keyword, keyword).
                where(roomKeyword.room.id.eq(roomId)).fetch();
    }

    private List<RoomLoungeResponseDto> getLounges(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomLoungeResponseDto.class,
                                lounge.id,
                                lounge.name
                        )).
                from(lounge).
                where(lounge.room.id.eq(roomId)).fetch();
    }


    private List<RoomChannelResponseDto> getChannels(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomChannelResponseDto.class,
                                channel.id,
                                channel.name
                        )).
                from(channel).
                where(channel.room.id.eq(roomId)).fetch();
    }

    private <T> OrderSpecifier<?> makeOrder(RoomSearchRequestDto req) {
        // default는 최신순으로 가져오기로 함
        if (req.getSortBy() == null) return room.createdAt.desc();
        OrderSpecifier<?> path = switch (req.getSortBy()) {
            case LATEST -> room.mcount.desc();
            case OLDEST -> room.capacity.asc();
            case CURRENT_PEOPLE -> null;
        };
        return path;
    }

    private BooleanExpression eqKeyword(String keyword) {
        if (StringUtils.isEmpty(keyword)) return null;
        return room.title.contains(keyword)
                .or(room.description.contains(keyword));
    }

    private BooleanExpression isLocked(Boolean isLocked) {
        if (isLocked == null) return null;
        return room.isLocked.eq(isLocked);
    }

    private BooleanExpression eqConstraints(List<RoomConstraints> constraints) {
        if (constraints == null || constraints.isEmpty()) return null;
        return room.constraints.in(constraints);
    }

    private BooleanExpression eqType(RoomType type) {
        return room.type.eq(type);
    }

    private BooleanExpression eqKeywordIds(List<Long> keywordIds) {
        if (keywordIds == null || keywordIds.isEmpty()) return null;

        // 주어진 keyword id를 모두 가지고 있는 room의 id를 선택
        JPQLQuery<Long> subQuery = JPAExpressions
                .select(roomKeyword.room.id)
                .from(roomKeyword)
                .leftJoin(roomKeyword.keyword)
                .where(roomKeyword.keyword.id.in(keywordIds))
                .groupBy(roomKeyword.room.id)
                .having(roomKeyword.keyword.id.count().eq((long) keywordIds.size()));

        return room.id.in(subQuery);
    }

    private BooleanExpression eqManagerNickname(String managerNickname) {
        if (managerNickname == null) return null;
        return room.manager.nickname.eq(managerNickname);
    }
}
