package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.controller.dto.BoardListRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardListResponseDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.BoardSortBy;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.a506.comeet.common.enums.RecruitBoardCategory;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.a506.comeet.app.board.entity.QBoard.board;
import static com.a506.comeet.app.keyword.entity.QRoomKeyword.roomKeyword;

@RequiredArgsConstructor
@Repository
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory; // JPA 쿼리를 생성하고 실행하는데 사용

    @Override
    public Page<BoardListResponseDto> searchBoardCustom(BoardListRequestDto req, Pageable pageable) {
		// 쿼리 설정
        JPAQuery<Board> query = jpaQueryFactory
            .selectFrom(board) // board와 writer 조인
            .leftJoin(board.writer)
			.leftJoin(board.room)
			.fetchJoin()
            .where(eqKeywordIds(req.getKeywordIds()), eqBoardType(req.getBoardType()), eqSearchKeyword(req.getSearchKeyword()), eqWriterNickName(req.getWriterNickname()),
					eqRecruitBoardCategory(req.getRecruitBoardCategory()), eqFreeBoardCategory(req.getFreeBoardCategory()), eqCapacity(req.getCapacity()))
			.orderBy(eqSortBy(req.getSortBy()));

        long total = query.fetchCount(); // 전체 게시물 수

		// 페이징된 게시물 조회
		List<Board> boards = query
			.offset(pageable.getOffset()) //반환되는 행의 시작점
			.limit(pageable.getPageSize())	//반환되는 행의 수
			.fetch();

		//Dto 변환
		List<BoardListResponseDto> res = boards.stream().map(board ->
			BoardListResponseDto.toBoardListResponseDto(board, board.getRoom(), board.getWriter(), getKeywords(board.getRoom()))
		).collect(Collectors.toList());

		//페이지 객체 반환
        return new PageImpl<>(res, pageable, total);
    }

	private BooleanExpression eqRecruitBoardCategory(RecruitBoardCategory recruitBoardCategory) {
		if(recruitBoardCategory == null)
			return null;
		if(recruitBoardCategory.equals(RecruitBoardCategory.ON))
			return board.isValid.eq(true);
		else
			return board.isValid.eq(false);
	}

	private BooleanExpression eqFreeBoardCategory(FreeBoardCategory freeBoardCategory) {
		if(freeBoardCategory == null)
			return null;
		if(freeBoardCategory.equals(FreeBoardCategory.POPULAR)){
			return board.likeCount.goe(10);
		}
		return board.category.eq(freeBoardCategory);
	}

	private BooleanExpression eqCapacity(Integer capacity) {
		if(capacity == null)
			return null;
		return board.room.capacity.loe(capacity);
	}

	private BooleanExpression eqBoardType(BoardType boardType) {
		if(boardType == null)
			return null;
		return board.type.eq(boardType);
	}

	private BooleanExpression eqSearchKeyword(String keyword){
		if(keyword == null || keyword.isEmpty() || keyword.isBlank())
			return null;
		return board.title.containsIgnoreCase(keyword); //대소문자 구분하지 않는 부분 문자열 검색
	}

	private BooleanExpression eqWriterNickName(String writerNickname) {
		if(writerNickname == null)
			return null;
		return board.writer.nickname.eq(writerNickname);
	}

	private BooleanExpression eqKeywordIds(List<Long> keywordIds){
		if(keywordIds == null || keywordIds.isEmpty())
			return null;

		//프로그래밍언어 키워드 조회를 위한 서브 쿼리
		JPAQuery<Long> subQuery = jpaQueryFactory
				.select(roomKeyword.room.id)
				.from(roomKeyword)
				.leftJoin(roomKeyword.keyword)
				.where(roomKeyword.keyword.id.in(keywordIds))
				.groupBy(roomKeyword.room.id)
				.having(roomKeyword.keyword.id.count().eq((long) keywordIds.size()));

		return board.room.id.in(subQuery);
	}

	NumberExpression<Double> recruitRate = Expressions.numberTemplate(Double.class,
			"CAST({0} AS double) / {1}",
			board.room.mcount,
			board.room.capacity);

	private OrderSpecifier<?> eqSortBy(BoardSortBy sortBy) {
		switch (sortBy) {
			case LIKES:
				return board.likeCount.desc();
			case RECRUIT:
				return recruitRate.asc();
			default:
				return board.createdAt.desc(); // 기본 정렬 (최신순)
		}
	}

	private List<KeywordResponseDto> getKeywords(Room room){
		List<KeywordResponseDto> keywords = new ArrayList<>();
		if(room != null) {
			if (room.getRoomKeywords() == null)
				return null;
			for (RoomKeyword roomKeyword : room.getRoomKeywords()) {
				keywords.add(new KeywordResponseDto(roomKeyword.getKeyword().getId(), roomKeyword.getKeyword().getName()));
			}
		}
		return keywords;
	}
}