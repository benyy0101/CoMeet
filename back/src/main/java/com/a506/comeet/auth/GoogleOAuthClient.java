package com.a506.comeet.auth;

import com.a506.comeet.auth.controller.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class GoogleOAuthClient implements OAuthClient{

    private static final String ACCESS_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String MEMBER_INFO_URL = "https://www.googleapis.com/userinfo/v2/me";
    private static final RestTemplate restTemplate = new RestTemplate();
    private final String clientId;
    private final String clientSecret;

    public GoogleOAuthClient(@Value("${spring.security.oauth2.client.registration.google.client-id}") String clientId,
                             @Value("${spring.security.oauth2.client.registration.google.client-secret}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    @Override
    public OAuthAccessTokenResponse getAccessToken(String code) {
        log.info("{}", "토큰 가져오기");
        return restTemplate.postForObject(
                ACCESS_TOKEN_URL,
                new GoogleOAuthAccessTokenRequest(clientId, clientSecret, code, "http://localhost:8080/auth/oauth2/login/google", "authorization_code"),
                OAuthAccessTokenResponse.class
                );
    }

    @Override
    public OAuthMemberInfoResponse getMemberInfo(String accessToken) {
        log.info("{}", "정보 가져오기");
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return restTemplate.exchange(
                MEMBER_INFO_URL,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                GoogleOAuthMemberInfoResponse.class
        ).getBody();
    }
}
