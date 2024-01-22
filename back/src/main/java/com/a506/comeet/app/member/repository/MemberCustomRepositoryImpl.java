package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.app.member.entity.QMember.member;

@RequiredArgsConstructor
@Repository
public class MemberCustomRepositoryImpl implements MemberCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public int memberDuplicationCount(MemberDuplicationRequestDto req) {
        List<String> res = jpaQueryFactory.select(member.memberId)
                .from(member).where(makeBooleanBuilder(req)).fetch();
        return res.size();
    }

    private BooleanBuilder makeBooleanBuilder(MemberDuplicationRequestDto req) {
        BooleanBuilder builder = new BooleanBuilder();

        if (req.getMemberId() != null) {
            builder.and(member.memberId.eq(req.getMemberId()));
        }
        if (req.getNickname() != null) {
            builder.and(member.nickname.eq(req.getNickname()));
        }
        if (req.getEmail() != null) {
            builder.and(member.email.eq(req.getEmail()));
        }

        return builder;
    }

}
