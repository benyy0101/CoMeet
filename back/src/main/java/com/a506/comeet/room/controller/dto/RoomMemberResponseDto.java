package com.a506.comeet.room.controller.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class RoomMemberResponseDto {

    private String memberId;
    private String nickname;
    private String profileImage;
    private String feature;

    @QueryProjection
    public RoomMemberResponseDto(String memberId, String nickname, String profileImage, String feature) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.feature = feature;
    }
}
