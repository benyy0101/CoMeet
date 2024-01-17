package com.a506.comeet.member.controller;

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
    private String feature;

    public MemberUpdateRequestDto(String name, String password, String nickname, String link, String profileImage, String email, String description, String feature) {
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
