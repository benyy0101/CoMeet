package com.a506.comeet.auth.controller;

import com.a506.comeet.app.member.MemberUtil;
import com.a506.comeet.auth.JwtTokenProvider;
import com.a506.comeet.auth.controller.dto.LoginReqeustDto;
import com.a506.comeet.auth.controller.dto.LoginResponseDto;
import com.a506.comeet.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginReqeustDto req){
        log.info("request memberId = {}, password = {}", req.getMemberId(), req.getPassword());
        LoginResponseDto res = authService.login(req.getMemberId(), req.getPassword());
        log.info("jwtToken accessToken = {}, reqeustToken = {}", res.getJwtToken().getAccessToken(), res.getJwtToken().getRefreshToken());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/test")
    public String test(){
        log.info("test 완료");
        return MemberUtil.getMemberId();
    }

    @PatchMapping("/reissue")
    public ResponseEntity<String> reissue(HttpServletRequest req){
        String newAccessToken = authService.reissueAccessToken(jwtTokenProvider.resolveToken(req));
        return ResponseEntity.ok(newAccessToken);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        String memberId = MemberUtil.getMemberId();
        authService.logout(memberId);
        return ResponseEntity.ok("logout");
    }

}
