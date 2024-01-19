package com.a506.comeet.member.repository;


import com.a506.comeet.member.controller.dto.MemberSimpleResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.member.entity.QMember.member;
import static com.a506.comeet.member.entity.QFollow.follow;


@RequiredArgsConstructor
@Repository
public class FollowCustomRepositoryImpl implements FollowCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<MemberSimpleResponseDto> getFollowers(Pageable pageable, String memberId) {
        List<MemberSimpleResponseDto> content = jpaQueryFactory.select(Projections.constructor(MemberSimpleResponseDto.class,
                member.memberId,
                member.nickname,
                member.profileImage,
                member.feature
                )).from(follow)
                .join(member)
                .on(follow.from.eq(member))
                .where(follow.to.memberId.eq(memberId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()+1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize(); // 뒤에 더 있는지 확인
        content = hasNext ? content.subList(0, pageable.getPageSize()) : content; // 뒤에 더 있으면 1개 더 가져온거 빼고 넘긴다
        return new SliceImpl<>(content, pageable, hasNext);
    }

    @Override
    public Slice<MemberSimpleResponseDto> getFollowings(Pageable pageable, String memberId) {
        List<MemberSimpleResponseDto> content = jpaQueryFactory.select(Projections.constructor(MemberSimpleResponseDto.class,
                        member.memberId,
                        member.nickname,
                        member.profileImage,
                        member.feature
                )).from(follow)
                .join(member)
                .on(follow.to.eq(member))
                .where(follow.from.memberId.eq(memberId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()+1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize(); // 뒤에 더 있는지 확인
        content = hasNext ? content.subList(0, pageable.getPageSize()) : content; // 뒤에 더 있으면 1개 더 가져온거 빼고 넘긴다
        return new SliceImpl<>(content, pageable, hasNext);
    }
}
