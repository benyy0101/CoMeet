package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentCreateRequestDto {

    private Long boardId;
    private String content;
    private String WriterNickname;
}