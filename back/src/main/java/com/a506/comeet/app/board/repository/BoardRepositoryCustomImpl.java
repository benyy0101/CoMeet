package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.controller.dto.BoardDetailResponseDto;
import com.a506.comeet.app.board.controller.dto.BoardListRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardListResponseDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.a506.comeet.app.board.entity.QBoard.*;

@RequiredArgsConstructor
@Repository
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<BoardListResponseDto> searchBoardCustom(BoardListRequestDto req, Pageable pageable) {
        JPAQuery<Board> query = jpaQueryFactory
            .selectFrom(board)
            .leftJoin(board.writer).fetchJoin()
            .where(eqCategory(req.getCategory()), eqKeyword(req.getKeyword()));

        long total = query.fetchCount(); // 전체 항목 수 계산

		List<Board> boards = query
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(board.createdAt.desc())
			.fetch();

		List<BoardListResponseDto> res = boards.stream().map(board ->
			BoardListResponseDto.toBoardListResponseDto(board, board.getRoom(), board.getWriter(), getKeywordsString(board.getRoom()))
		).collect(Collectors.toList());

        return new PageImpl<>(res, pageable, total);
    }

	private BooleanExpression eqCategory(FreeBoardCategory category) {
		if (category == null) {
			return null;
		}

		return board.category.eq(category);
	}

	private BooleanExpression eqKeyword(String keyword){
		if(keyword == null || keyword.isEmpty() || keyword.isBlank())
			return null;
		return board.title.containsIgnoreCase(keyword);
	}

	private String getKeywordsString(Room room){
		StringBuilder keywordsString = new StringBuilder();
		if(room != null) {
			if (room.getRoomKeywords() == null)
				return null;
			for (RoomKeyword roomKeyword : room.getRoomKeywords()) {
				if (!keywordsString.isEmpty()) {
					keywordsString.append(", ");
				}
				keywordsString.append(roomKeyword.getKeyword());
			}
		}

		return keywordsString.toString();
	}
}