package com.a506.comeet.app.room.controller.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.a506.comeet.app.room.controller.dto.QRoomMemberResponseDto is a Querydsl Projection type for RoomMemberResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QRoomMemberResponseDto extends ConstructorExpression<RoomMemberResponseDto> {

    private static final long serialVersionUID = 1463367802L;

    public QRoomMemberResponseDto(com.querydsl.core.types.Expression<String> memberId, com.querydsl.core.types.Expression<String> nickname, com.querydsl.core.types.Expression<String> profileImage, com.querydsl.core.types.Expression<com.a506.comeet.common.enums.MemberFeature> feature) {
        super(RoomMemberResponseDto.class, new Class<?>[]{String.class, String.class, String.class, com.a506.comeet.common.enums.MemberFeature.class}, memberId, nickname, profileImage, feature);
    }

}

