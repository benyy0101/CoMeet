package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public Slice<RoomSearchResponseDto> searchRoomCustom(RoomSearchRequestDto req, Pageable pageable) {
        List<RoomSearchResponseDto> content = jpaQueryFactory.select(Projections.constructor(RoomSearchResponseDto.class,
                        room.id,
                        member.memberId,
                        member.nickname,
                        room.title,
                        room.description,
                        room.link,
                        room.roomImage,
                        room.capacity,
                        room.isLocked,
                        room.password,
                        room.constraints,
                        room.type, room.createdAt)).distinct().
                from(room)
                .innerJoin(member).on(room.manager.memberId.eq(member.memberId))
                .leftJoin(roomKeyword).on(roomKeyword.room.eq(room))
                .leftJoin(keyword).on(roomKeyword.keyword.eq(keyword))
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
                .limit(pageable.getPageSize() + 1). // 1개를 더 가져온다
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
                leftJoin(room.manager, member).
                where(room.id.eq(roomId).and(room.manager.eq(member))).fetchOne();

        res.setMembers(getMembers(roomId));
        res.setLounges(getLounges(roomId));
        res.setChannels(getChannels(roomId));
        res.setKeywords(getKeywords(roomId));
        return res;
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

    @Override
    public Optional<String> findMemberByRoomIdAndMemberId(Long roomId, String memberId){
        return Optional.ofNullable(jpaQueryFactory.select(member.memberId)
                .from(room)
                .innerJoin(member).on(room.manager.eq(member))
                .where(room.id.eq(roomId).and(member.memberId.eq(memberId))).fetchOne());
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

    private List<RoomKeywordResponseDto> getKeywords(Long roomId) {
        return jpaQueryFactory.select(
                        Projections.constructor(RoomKeywordResponseDto.class,
                                keyword.id,
                                keyword.name
                        )).
                from(room).
                leftJoin(room.roomKeywords, roomKeyword).
                leftJoin(roomKeyword.keyword, keyword).
                where(room.id.eq(roomId)).fetch();
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

    private BooleanExpression eqConstraints(List<RoomConstraints> constraints){
        if(constraints == null || constraints.isEmpty()) return null;
        return room.constraints.in(constraints);
    }

    private BooleanExpression eqType(RoomType type){
        return room.type.eq(type);
    }

    private BooleanExpression eqKeywordIds(List<Long> keywordIds){
        if(keywordIds == null || keywordIds.isEmpty()) return null;
        return roomKeyword.keyword.id.in(keywordIds);
    }

    private BooleanExpression eqManagerNickname(String managerNickname) {
        if (managerNickname == null) return null;
        return room.manager.nickname.eq(managerNickname);
    }


}
