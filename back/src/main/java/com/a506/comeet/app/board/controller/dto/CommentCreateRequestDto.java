package com.a506.comeet.app.board.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentCreateRequestDto {

    private Long boardId;
    private String content;
    private String WriterNickname;
}