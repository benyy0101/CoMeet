package com.a506.comeet.app.etc.repository;

import com.a506.comeet.app.etc.controller.dto.TilListResponseDto;
import com.a506.comeet.app.etc.controller.dto.TilSearchRequestDto;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static com.a506.comeet.app.member.entity.QMember.member;
import static com.a506.comeet.app.etc.entity.QTil.til;



@RequiredArgsConstructor
@Repository
@Slf4j
public class TilCustomRepositoryImpl implements TilCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public boolean tilWithMemberAndDateExists(String memberId, LocalDate date) {
        Long tilId = jpaQueryFactory.select(til.id)
                .from(til)
                .where(til.member.memberId.eq(memberId)
                        .and(til.date.eq(date)))
                .fetchFirst();
        return tilId != null;
    }

    @Override
    public TilListResponseDto tilWithSearchRequest(TilSearchRequestDto req, String memberId) {
        LocalDate date = LocalDate.of(req.getYear(), req.getMonth(), 1);
        List<Tuple> tuples =  jpaQueryFactory.select(
                til.id, til.date)
                .from(til)
                .join(til.member, member).on(til.member.memberId.eq(memberId))
                .where(til.date.between(date, date.plusMonths(1).minusDays(1)))
                .fetch();

        log.info("tuple size {}", tuples.size());
        TilListResponseDto res = new TilListResponseDto();
        for (Tuple tuple : tuples) {
            log.info("{}", tuple.get(til.id));
            log.info("{}", tuple.get(til.date));
            res.of(tuple.get(til.id), tuple.get(til.date));
        }
        Collections.sort(res.getContent());

        return res;
    }
}
