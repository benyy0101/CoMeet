package com.a506.comeet.app.etc.repository;

import com.a506.comeet.app.etc.controller.dto.NoteSimpleResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

import static com.a506.comeet.app.etc.entity.QNote.note;


@RequiredArgsConstructor
@Repository
public class NoteCustomRepositoryImpl implements NoteCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<NoteSimpleResponseDto> getNoteList(String memberId, Pageable pageable) {
        JPAQuery<NoteSimpleResponseDto> query = jpaQueryFactory.select(
                        Projections.constructor(
                                NoteSimpleResponseDto.class,
                                note.id,
                                note.writer.memberId,
                                note.writer.nickname,
                                note.receiver.memberId,
                                note.isRead
                        )).from(note)
                .where(note.receiver.memberId.eq(memberId))
                .orderBy(note.createdAt.desc());

        long total = query.fetch().size();

        List<NoteSimpleResponseDto> res =
        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(res, pageable, total);
    }

    @Override
    public int getUnreadCount(String memberId) {
        return Objects.requireNonNull(jpaQueryFactory.select(note.count())
                .from(note)
                .where(note.isRead.isFalse()
                        .and(note.receiver.memberId.eq(memberId)))
                .fetchOne()).intValue();
    }


}
