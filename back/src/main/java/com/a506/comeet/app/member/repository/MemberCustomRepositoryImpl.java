package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.TilSimpleResponseDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import static com.a506.comeet.app.etc.entity.QTil.til;
import static com.a506.comeet.app.member.entity.QMember.member;
import static com.a506.comeet.app.member.entity.QFollow.follow;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

@RequiredArgsConstructor
@Repository
public class MemberCustomRepositoryImpl implements MemberCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public int getMemberDuplicationCount(MemberDuplicationRequestDto req) {
        List<String> res = jpaQueryFactory.select(member.memberId)
                .from(member).where(makeBooleanBuilder(req)).fetch();

        return res.size();
    }

    @Override
    public MemberDetailResponseDto getMemberDetail(String memberId) {
        LocalDate from = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
        LocalDate to = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
        MemberDetailResponseDto res = jpaQueryFactory.selectFrom(member)
                .leftJoin(member.tils, til)
                .where(member.memberId.eq(memberId).and(til.date.between(from, to))) // 이번달 것만 가져옴
                .distinct()
                .transform(
                        groupBy(member.memberId).as(
                                        Projections.constructor(
                                                MemberDetailResponseDto.class,
                                                member.memberId,
                                                member.name,
                                                member.nickname,
                                                member.link,
                                                member.profileImage,
                                                member.email,
                                                member.description,
                                                member.feature,
                                                list(Projections.constructor(
                                                        TilSimpleResponseDto.class,
                                                        til.id,
                                                        til.date
                                                ))
                        )
                )).get(memberId);
        if (res == null) return null;
        // 팔로잉, 팔로워 수 계산
        res.setFollowerCount(countFollower(memberId));
        res.setFollowingCount(countFollowing(memberId));
        return res;
    }

    private int countFollowing(String memberId) {
        return jpaQueryFactory
                .selectFrom(follow)
                .where(follow.to.memberId.eq(memberId))
                .fetch().size();
    }

    private int countFollower(String memberId) {
        return jpaQueryFactory
                    .selectFrom(follow)
                    .where(follow.from.memberId.eq(memberId))
                    .fetch().size();
    }


    private BooleanBuilder makeBooleanBuilder(MemberDuplicationRequestDto req) {
        BooleanBuilder builder = new BooleanBuilder();

        if (req.getMemberId() != null) {
            builder.or(member.memberId.eq(req.getMemberId()));
        }
        if (req.getNickname() != null) {
            builder.or(member.nickname.eq(req.getNickname()));
        }
        if (req.getEmail() != null) {
            builder.or(member.email.eq(req.getEmail()));
        }

        return builder;
    }

}
