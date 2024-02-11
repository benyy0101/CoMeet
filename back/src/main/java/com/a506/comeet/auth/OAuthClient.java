package com.a506.comeet.auth;

import com.a506.comeet.auth.controller.dto.OAuthAccessTokenResponse;
import com.a506.comeet.auth.controller.dto.GithubOAuthMemberInfoResponse;
import com.a506.comeet.auth.controller.dto.OAuthMemberInfoResponse;

public interface OAuthClient {
    OAuthAccessTokenResponse getAccessToken(String code);
    OAuthMemberInfoResponse getMemberInfo(String accessToken);
}
