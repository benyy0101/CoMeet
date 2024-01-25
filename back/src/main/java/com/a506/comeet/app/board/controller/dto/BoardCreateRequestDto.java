package com.a506.comeet.app.board.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardCreateRequestDto {

    private String writerId;
    private String title;
    private String content;
    private Integer likecount;
    private String type;
    private String category;
    private Long roomId;
    private Boolean valid;
}
