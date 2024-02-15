package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.a506.comeet.app.room.controller.dto.QRoomLoungeResponseDto is a Querydsl Projection type for RoomLoungeResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QRoomLoungeResponseDto extends ConstructorExpression<RoomLoungeResponseDto> {

    private static final long serialVersionUID = -1266454054L;

    public QRoomLoungeResponseDto(com.querydsl.core.types.Expression<Long> loungeId, com.querydsl.core.types.Expression<String> name) {
        super(RoomLoungeResponseDto.class, new Class<?>[]{long.class, String.class}, loungeId, name);
    }

}

