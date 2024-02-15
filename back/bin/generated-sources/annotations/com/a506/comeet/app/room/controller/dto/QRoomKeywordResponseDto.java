package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.a506.comeet.app.room.controller.dto.QRoomKeywordResponseDto is a Querydsl Projection type for RoomKeywordResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QRoomKeywordResponseDto extends ConstructorExpression<RoomKeywordResponseDto> {

    private static final long serialVersionUID = 1051348319L;

    public QRoomKeywordResponseDto(com.querydsl.core.types.Expression<Long> keywordId, com.querydsl.core.types.Expression<String> name) {
        super(RoomKeywordResponseDto.class, new Class<?>[]{long.class, String.class}, keywordId, name);
    }

}

