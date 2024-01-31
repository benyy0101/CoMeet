package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.common.enums.FreeBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardListRequestDto {
    private FreeBoardCategory category;
    private String keyword;
}
