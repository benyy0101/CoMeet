package com.a506.comeet.auth.service;

import com.a506.comeet.app.etc.repository.NoteRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.RoomSimpleResponseDto;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.common.util.AES128Util;
import com.a506.comeet.auth.JwtToken;
import com.a506.comeet.auth.JwtTokenProvider;
import com.a506.comeet.auth.controller.dto.LoginResponseDto;
import com.a506.comeet.auth.repository.JwtRedisRepository;
import com.a506.comeet.common.util.KeyUtil;
import com.a506.comeet.error.exception.RestApiException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.a506.comeet.error.errorcode.CustomErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtRedisRepository jwtRedisRepository;
    private final MemberRepository memberRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final NoteRepository noteRepository;
    private final PasswordEncoder passwordEncoder;
    private final AES128Util aes128Util;

    public LoginResponseDto login(String memberId, String password) {

        memberIdAndPasswordValidation(memberId, password);
        // 1. username(memberId) + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);
        // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(NO_MEMBER));
        List<RoomSimpleResponseDto> joinedRooms = roomMemberRepository.getJoinedRooms(memberId);
        int unreadNoteCount = noteRepository.getUnreadCount(memberId);

        return LoginResponseDto.builder()
                .memberId(memberId)
                .nickname(member.getNickname())
                .profileImage(member.getProfileImage())
                .jwtToken(jwtToken)
                .joinedRooms(joinedRooms)
                .unreadNoteCount(unreadNoteCount)
                .build();
    }



    @Transactional
    public void logout(String memberId){
        jwtRedisRepository.delete(KeyUtil.getRefreshTokenKey(memberId));
    }

    public String reissueAccessToken(String encryptedRefreshToken) {
        // 유저가 제공한 refreshToken이 있는지 확인
        if (encryptedRefreshToken == null) throw new RestApiException(COOKIE_REFRESH_TOKEN_NOT_EXISTS);
        String refreshToken = aes128Util.decryptAes(encryptedRefreshToken);
        // userId 정보를 가져와서 redis에 있는 refreshtoken과 같은지 확인
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);
        String memberId = claims.getSubject();
        String redisRefreshToken = jwtRedisRepository.find(KeyUtil.getRefreshTokenKey(memberId));
        if (redisRefreshToken == null || !redisRefreshToken.equals(refreshToken)) throw new RestApiException(INVALID_REFRESH_TOKEN);
        // 같다면 refreshToken을 활용하여 새로운 accessToken을 발급
        return jwtTokenProvider.generateAccessToken(memberId, claims.get("auth").toString());
    }

    private void memberIdAndPasswordValidation(String memberId, String password) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(LOGIN_FAIL));
        if (!passwordEncoder.matches(password, member.getPassword()))
            throw new RestApiException(LOGIN_FAIL);
    }

}
