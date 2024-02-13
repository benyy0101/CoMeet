package com.a506.comeet.auth.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OAuthMemberInfoResponse {

    private String oauthId;

    private String name;

    private String profileUrl;

    private String email;

}