package com.a506.comeet.member.controller;

import com.a506.comeet.common.enums.MemberFeature;
import lombok.Getter;

@Getter
public class MemberUpdateRequestDto {

    private String name;
    private String password;
    private String nickname;
    private String link;
    private String profileImage;
    private String email;
    private String description;
    private MemberFeature feature;

    public MemberUpdateRequestDto(String name, String password, String nickname, String link, String profileImage, String email, String description, MemberFeature feature) {
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.link = link;
        this.profileImage = profileImage;
        this.email = email;
        this.description = description;
        this.feature = feature;
    }

}
