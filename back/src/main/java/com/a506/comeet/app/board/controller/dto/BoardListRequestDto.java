package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.common.enums.BoardSortBy;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.a506.comeet.common.enums.RecruitBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static com.a506.comeet.common.enums.BoardSortBy.LATEST;

@Getter
@Setter
@NoArgsConstructor
public class BoardListRequestDto {

    private BoardType boardType;    //게시판 타입

    private String searchKeyword;   //제목 + 본문
    private String writerNickname;           //작성자
    private BoardSortBy sortBy = LATEST;     //정렬 타입 (최신순, 좋아요순, 모집률순)

    private RecruitBoardCategory recruitBoardCategory;  //모집 게시판 카테고리 (모집중, 모집완료)
    private List<Long> keywordIds;  //모집 게시판 프로그래밍 키워드
    private Integer capacity;       //모집 게시판 방최대인원수

    private FreeBoardCategory freeBoardCategory;    //자유 게시판 카테고리 (잡담, 팁, 질문, 홍보)
}