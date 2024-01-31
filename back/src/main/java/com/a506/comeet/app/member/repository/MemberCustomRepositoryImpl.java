package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public MemberDetailResponseDto getMemberDetail(String memberId) {
//        MemberDetailResponseDto res = jpaQueryFactory.select(Projections.constructor(MemberDetailResponseDto.class,
//                        member.memberId,
//                        member.name,
//                        member.nickname,
//                        member.link,
//                        member.profileImage,
//                        member.email,
//                        member.description,
//                        member.feature))
//                .from(member);
//        return res;
        return null;
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
