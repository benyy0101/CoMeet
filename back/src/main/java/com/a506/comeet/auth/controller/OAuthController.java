package com.a506.comeet.auth.controller;

import com.a506.comeet.auth.SocialLoginType;
import com.a506.comeet.auth.controller.dto.LoginReqeustDto;
import com.a506.comeet.auth.controller.dto.LoginResponseDto;
import com.a506.comeet.auth.service.AuthService;
import com.a506.comeet.auth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.a506.comeet.auth.SocialLoginType.*;

@RestController
@RequestMapping("/auth/oauth2")
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final OAuthService oAuthService;

    @Value("${spring.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenValidityInSeconds;

    @GetMapping("login/github")
    public ResponseEntity<LoginResponseDto> gitHubLogin(@RequestParam String code){
        LoginResponseDto res = oAuthService.githubOAuthLogin(code);
        HttpHeaders headers = getHeadersWithCookie(res);
        return new ResponseEntity<>(res, headers, HttpStatus.OK);
    }

    @GetMapping("login/google")
    public ResponseEntity<LoginResponseDto> googleLogin(@RequestParam String code){
        LoginResponseDto res = oAuthService.googleOAuthLogin(code);
        HttpHeaders headers = getHeadersWithCookie(res);
        return new ResponseEntity<>(res, headers, HttpStatus.OK);
    }

    private HttpHeaders getHeadersWithCookie(LoginResponseDto res) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", res.getJwtToken().deleteRefreshToken())
                .maxAge(refreshTokenValidityInSeconds)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", cookie.toString());
        return headers;
    }

}
