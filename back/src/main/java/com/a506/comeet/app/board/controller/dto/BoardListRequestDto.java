package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.common.enums.BoardSearchType;
import com.a506.comeet.common.enums.BoardSortType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardListRequestDto {
    private Integer capacity; //최대 인원(가입한 인원 / 최대 인원)
    private FreeBoardCategory category; //CHAT, TIP, QUESTION, PROMOTION
    private BoardSearchType searchType;    //CONTENT, WRITER
    private BoardSortType sortType;  //RECENT, LIKES, RECRUIT
    private String keyword; //검색 내용
}