package com.a506.comeet.app.member.controller.dto;


import com.a506.comeet.common.enums.MemberFeature;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MemberSimpleResponseDto {
    private String memberId;
    private String nickname;
    private String profileImage;
    private MemberFeature feature;

    @QueryProjection
    public MemberSimpleResponseDto(String memberId, String nickname, String profileImage, MemberFeature feature) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.feature = feature;
    }
}
