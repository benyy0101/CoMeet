package com.a506.comeet.app.member.service;

import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.login.JwtToken;
import com.a506.comeet.login.JwtTokenProvider;
import com.a506.comeet.login.JwtRedisRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtRedisRepository jwtRedisRepository;

    @Transactional
    public JwtToken login(String memberId, String password) {
        // 1. username(memberId) + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);

        // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("{}", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(",")));
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }

    @Transactional
    public void logout(String memberId){
        jwtRedisRepository.delete(memberId);
        // 추가적으로 redis에 유저가 입장해있는 방 정보도 삭제해주면 된다
    }

    public String reissueAccessToken(String refreshToken) {
        // 유저가 제공한 refreshToken이 있는지 확인
        if (refreshToken == null) throw new RestApiException(CustomErrorCode.HEADER_REFRESH_TOKEN_NOT_EXISTS);

        // userId 정보를 가져와서 redis에 있는 refreshtoken과 같은지 확인
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);
        String memberId = claims.getSubject();
        log.info("{}", memberId);
        String redisRefreshToken = jwtRedisRepository.getRefreshToken(memberId);
        if (redisRefreshToken == null || !redisRefreshToken.equals(refreshToken)) throw new RestApiException(CustomErrorCode.INVALID_REFRESH_TOKEN);
        // 같다면 refreshToken을 활용하여 새로운 accessToken을 발급
        return jwtTokenProvider.generateAccessToken(memberId, claims.get("auth").toString());
    }

}
