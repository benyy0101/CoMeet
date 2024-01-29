package com.a506.comeet.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class JwtToken {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
