package com.a506.comeet.auth.service;

import com.a506.comeet.auth.controller.dto.GithubOAuthAccessTokenRequest;
import com.a506.comeet.auth.controller.dto.OAuthAccessTokenResponse;
import com.a506.comeet.auth.controller.dto.GithubOAuthMemberInfoResponse;
import com.a506.comeet.auth.controller.dto.OAuthMemberInfoResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class GithubOAuthClient implements OAuthClient {

    private static final String ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
    private static final String MEMBER_INFO_URL = "https://api.github.com/user";
    private static final RestTemplate restTemplate = new RestTemplate();
    private final String clientId;
    private final String clientSecret;

    public GithubOAuthClient(@Value("${spring.security.oauth2.client.registration.github.client-id}") String clientId,
                             @Value("${spring.security.oauth2.client.registration.github.client-secret}") String clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    @Override
    public OAuthAccessTokenResponse getAccessToken(String code) {
        return restTemplate.postForObject(
                ACCESS_TOKEN_URL,
                new GithubOAuthAccessTokenRequest(clientId, clientSecret, code),
                OAuthAccessTokenResponse.class
                );
    }

    @Override
    public OAuthMemberInfoResponse getMemberInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return restTemplate.exchange(
                MEMBER_INFO_URL,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                GithubOAuthMemberInfoResponse.class
        ).getBody();
    }
}
