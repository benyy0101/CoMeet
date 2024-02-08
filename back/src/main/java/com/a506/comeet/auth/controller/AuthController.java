package com.a506.comeet.auth.controller;

import com.a506.comeet.auth.controller.dto.LoginReqeustDto;
import com.a506.comeet.auth.controller.dto.LoginResponseDto;
import com.a506.comeet.auth.service.AuthService;
import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @Value("${spring.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenValidityInSeconds;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginReqeustDto req){
        log.info("request memberId = {}", req.getMemberId());
        LoginResponseDto res = authService.login(req.getMemberId(), req.getPassword());
        log.info("jwtToken accessToken = {}, refreshToken = {}", res.getJwtToken().getAccessToken(), res.getJwtToken().getRefreshToken());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", res.getJwtToken().deleteRefreshToken())
                .maxAge(refreshTokenValidityInSeconds)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", cookie.toString());

        return new ResponseEntity<>(res, headers, HttpStatus.OK);
    }

    @GetMapping("/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest req) {
        log.info("redirected to reissue");
        Cookie[] cookies = req.getCookies();
        if (cookies == null) throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "쿠키가 존재하지 않습니다");

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refreshToken")){
                String encryptedRefreshToken = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
                log.info("encryptedRefreshToken : {}", encryptedRefreshToken);
                String newAccessToken = authService.reissueAccessToken(encryptedRefreshToken);
                return ResponseEntity.ok(newAccessToken);
            }
        }

        return new ResponseEntity<String>("필요한 쿠키가 존재하지 않습니다", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        String memberId = MemberUtil.getMemberId();
        authService.logout(memberId);
        return ResponseEntity.ok("logout");
    }

}
