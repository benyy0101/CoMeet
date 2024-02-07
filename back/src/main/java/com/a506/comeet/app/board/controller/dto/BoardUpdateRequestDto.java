package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.common.enums.FreeBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardUpdateRequestDto {

    private String title;
    private String content;
    private FreeBoardCategory category;
    private Boolean isValid;
}
