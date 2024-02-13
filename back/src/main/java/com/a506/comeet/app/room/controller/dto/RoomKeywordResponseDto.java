package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class RoomKeywordResponseDto {

    private Long keywordId;
    private String name;

    @QueryProjection
    public RoomKeywordResponseDto(Long keywordId, String name) {
        this.keywordId = keywordId;
        this.name = name;
    }
}
