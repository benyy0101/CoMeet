package com.a506.comeet.auth.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GoogleOAuthMemberInfoResponse extends OAuthMemberInfoResponse{

    @JsonProperty("id")
    private String oauthId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("picture")
    private String profileUrl;

    @JsonProperty("email")
    private String email;

}