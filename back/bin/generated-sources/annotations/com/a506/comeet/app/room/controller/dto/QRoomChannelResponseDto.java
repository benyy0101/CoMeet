package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.a506.comeet.app.room.controller.dto.QRoomChannelResponseDto is a Querydsl Projection type for RoomChannelResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QRoomChannelResponseDto extends ConstructorExpression<RoomChannelResponseDto> {

    private static final long serialVersionUID = -54699515L;

    public QRoomChannelResponseDto(com.querydsl.core.types.Expression<Long> channelId, com.querydsl.core.types.Expression<String> name) {
        super(RoomChannelResponseDto.class, new Class<?>[]{long.class, String.class}, channelId, name);
    }

}

