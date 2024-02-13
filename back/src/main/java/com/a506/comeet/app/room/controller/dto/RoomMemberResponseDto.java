package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.MemberFeature;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomMemberResponseDto {

    private String memberId;
    private String nickname;
    private String profileImage;
    private MemberFeature feature;

    @QueryProjection
    public RoomMemberResponseDto(String memberId, String nickname, String profileImage, MemberFeature feature) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.feature = feature;
    }
}
