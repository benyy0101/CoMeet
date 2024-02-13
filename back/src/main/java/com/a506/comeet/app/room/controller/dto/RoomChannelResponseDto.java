package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomChannelResponseDto {

    private Long channelId;
    private String name;

    @QueryProjection
    public RoomChannelResponseDto(Long channelId, String name) {
        this.channelId = channelId;
        this.name = name;
    }
}
