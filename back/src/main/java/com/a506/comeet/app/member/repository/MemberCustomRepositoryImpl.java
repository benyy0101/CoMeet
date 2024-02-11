package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.app.member.controller.dto.TilSimpleResponseDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.a506.comeet.app.etc.entity.QTil.til;
import static com.a506.comeet.app.member.entity.QFollow.follow;
import static com.a506.comeet.app.member.entity.QMember.member;

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
    public Optional<MemberDetailResponseDto> getMemberDetail(String memberId) {
        MemberDetailResponseDto res = jpaQueryFactory
                .select(Projections.constructor(
                        MemberDetailResponseDto.class,
                        member.memberId,
                        member.name,
                        member.nickname,
                        member.link,
                        member.profileImage,
                        member.email,
                        member.description,
                        member.feature
                ))
                .from(member)
                .where(member.memberId.eq(memberId))
                .fetchOne();
        if (res == null) return Optional.empty();

        // 이번달 TIL을 따로 넣어주어야 한다 (한방쿼리시 TIL이 없으면 멤버정보도 가져오지 못함)
        setThisMonthTIL(memberId, res);
        // 팔로잉, 팔로워 수 계산
        setFollowCount(res, memberId);

        return Optional.of(res);
    }

    private void setThisMonthTIL(String memberId, MemberDetailResponseDto res) {
        LocalDate from = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
        LocalDate to = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());
        List<TilSimpleResponseDto> tils = jpaQueryFactory
                .select(Projections.constructor(
                        TilSimpleResponseDto.class,
                        til.id,
                        til.date
                ))
                .from(til)
                .where(til.date.between(from, to).and(til.member.memberId.eq(memberId)))
                .fetch();
        res.setTils(tils);
    }

    @Override
    public List<MemberSimpleResponseDto> getCurrentMembers(Set<String> currentMemberIdSet) {
        return jpaQueryFactory.select(Projections.constructor(
                MemberSimpleResponseDto.class,
                member.memberId,
                member.nickname,
                member.profileImage,
                member.feature
                )).from(member)
                .where(member.memberId.in(currentMemberIdSet))
                .limit(currentMemberIdSet.size())
                .fetch();
    }

    private void setFollowCount(MemberDetailResponseDto res, String memberId) {
        Optional<Long> followerCount = Optional.ofNullable(jpaQueryFactory.select(follow.to.count())
                .from(follow)
                .where(follow.to.memberId.eq(memberId))
                .fetchOne());

        Optional<Long> followingCount = Optional.ofNullable(jpaQueryFactory.select(follow.from.count())
                .from(follow)
                .where(follow.from.memberId.eq(memberId))
                .fetchOne());

        followerCount.ifPresent(count -> res.setFollowerCount(count.intValue()));
        followingCount.ifPresent(count -> res.setFollowingCount(count.intValue()));
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
