package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.controller.dto.BoardListRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardListResponseDto;
import com.a506.comeet.app.room.controller.dto.*;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
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
import static com.a506.comeet.app.room.entity.QRoom.room;

@RequiredArgsConstructor
@Repository
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private BooleanExpression eqKeyword(String keyword){
        if(keyword == null || keyword.isEmpty() || keyword.isBlank())
            return null;
        return Expressions.asBoolean(true).isTrue();
    }

    @Override
    public Slice<BoardListResponseDto> searchBoardCustom(BoardListRequestDto req) {
        return null;
    }
}
