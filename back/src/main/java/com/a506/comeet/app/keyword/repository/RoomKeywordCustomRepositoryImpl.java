package com.a506.comeet.app.keyword.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a506.comeet.app.keyword.entity.QKeyword.keyword;
import static com.a506.comeet.app.keyword.entity.QRoomKeyword.roomKeyword;

@RequiredArgsConstructor
@Repository
@Slf4j
public class RoomKeywordCustomRepositoryImpl implements RoomKeywordCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public String getRoomKeywordValuesInString(Long roomId) {
        List<String> res = jpaQueryFactory.select(keyword.name)
                .from(roomKeyword)
                .innerJoin(roomKeyword.keyword)
                .where(roomKeyword.room.id.eq(roomId))
                .fetch();

        String res2 = String.join(" ", res);
        log.info("keyword values of {} : {}", roomId, res2);

        return res2;
    }
}
