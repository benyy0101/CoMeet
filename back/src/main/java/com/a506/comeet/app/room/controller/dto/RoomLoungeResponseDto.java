package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomLoungeResponseDto {

    private Long loungeId;
    private String name;

    @QueryProjection
    public RoomLoungeResponseDto(Long loungeId, String name) {
        this.loungeId = loungeId;
        this.name = name;
    }
}
