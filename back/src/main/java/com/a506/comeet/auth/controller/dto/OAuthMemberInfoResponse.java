package com.a506.comeet.auth.controller.dto;

import com.a506.comeet.app.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OAuthMemberInfoResponse {

    @JsonProperty("id")
    private String oauthId;

    @JsonProperty("login")
    private String name;

    @JsonProperty("avatar_url")
    private String profileUrl;

    @JsonProperty("email")
    private String email;

}