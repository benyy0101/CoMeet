package com.a506.comeet.app.member.controller;

import com.a506.comeet.Util.MemberUtil;
import com.a506.comeet.app.member.controller.dto.LoginReqeustDto;
import com.a506.comeet.app.member.service.AuthService;
import com.a506.comeet.login.JwtToken;
import com.a506.comeet.login.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody @Valid LoginReqeustDto req){
        log.info("request memberId = {}, password = {}", req.getMemberId(), req.getPassword());
        JwtToken jwtToken = authService.login(req.getMemberId(), req.getPassword());
        log.info("jwtToken accessToken = {}, reqeustToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());
        return new ResponseEntity<JwtToken>(jwtToken, HttpStatus.OK);
    }

    @PostMapping("/test")
    public String test(){
        return MemberUtil.getMemberId();
    }

    @PatchMapping("/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest req){
        String newAccessToken = authService.reissueAccessToken(jwtTokenProvider.resolveToken(req));
        return new ResponseEntity<String>(newAccessToken, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        String memberId = MemberUtil.getMemberId();
        authService.logout(memberId);
        return new ResponseEntity<String>("logout", HttpStatus.OK);
    }

}
