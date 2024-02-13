package com.a506.comeet.auth.service;

import com.a506.comeet.app.etc.repository.NoteRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.RoomSimpleResponseDto;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.auth.JwtToken;
import com.a506.comeet.auth.JwtTokenProvider;
import com.a506.comeet.auth.controller.dto.LoginResponseDto;
import com.a506.comeet.auth.controller.dto.OAuthAccessTokenResponse;
import com.a506.comeet.auth.controller.dto.OAuthMemberInfoResponse;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

import static com.a506.comeet.common.enums.SocialLoginType.*;
import static com.a506.comeet.error.errorcode.CustomErrorCode.NO_MEMBER;

@Service
@Transactional(readOnly = true)
@Slf4j
public class OAuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final NoteRepository noteRepository;
    private final PasswordEncoder passwordEncoder;
    private final OAuthClient githubOAuthClient;
    private final OAuthClient googleOAuthClient;

    @Value("spring.security.oauth2.client.registration.password-salt")
    private String salt;

    public OAuthService(JwtTokenProvider jwtTokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, MemberRepository memberRepository, RoomMemberRepository roomMemberRepository, NoteRepository noteRepository, PasswordEncoder passwordEncoder, @Qualifier("githubOAuthClient") OAuthClient githubOAuthClient, @Qualifier("googleOAuthClient") OAuthClient googleOAuthClient) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.memberRepository = memberRepository;
        this.roomMemberRepository = roomMemberRepository;
        this.noteRepository = noteRepository;
        this.passwordEncoder = passwordEncoder;
        this.githubOAuthClient = githubOAuthClient;
        this.googleOAuthClient = googleOAuthClient;
    }

    @Transactional
    public LoginResponseDto githubOAuthLogin(String code) {
        OAuthMemberInfoResponse res = getGithubUserInfo(code);
        String memberId = res.getOauthId() + GITHUB;
        createIfNewMember(memberId, res);
        return login(memberId);
    }

    @Transactional
    public LoginResponseDto googleOAuthLogin(String code) {
        OAuthMemberInfoResponse res = getGoogleUserInfo(code);
        String memberId = res.getOauthId() + GOOGLE;
        createIfNewMember(memberId, res);
        return login(memberId);
    }

    private LoginResponseDto login(String memberId) {
        JwtToken jwtToken = makeJwtToken(memberId);
        List<RoomSimpleResponseDto> joinedRooms = roomMemberRepository.getJoinedRooms(memberId);
        int unreadNoteCount = noteRepository.getUnreadCount(memberId);

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(NO_MEMBER));

        return LoginResponseDto.builder()
                .memberId(memberId)
                .nickname(member.getNickname())
                .profileImage(member.getProfileImage())
                .jwtToken(jwtToken)
                .joinedRooms(joinedRooms)
                .unreadNoteCount(unreadNoteCount)
                .build();
    }

    private OAuthMemberInfoResponse getGithubUserInfo(String code) {
        try {
            OAuthAccessTokenResponse tokenResponse = githubOAuthClient.getAccessToken(code);
            return githubOAuthClient.getMemberInfo(tokenResponse.getAccessToken());
        } catch (HttpClientErrorException e) {
            throw new RestApiException(CustomErrorCode.GITHUB_AUTHORIZATION_ERROR);
        }
    }

    private OAuthMemberInfoResponse getGoogleUserInfo(String code) {
        try {
            OAuthAccessTokenResponse tokenResponse = googleOAuthClient.getAccessToken(code);
            return googleOAuthClient.getMemberInfo(tokenResponse.getAccessToken());
        } catch (HttpClientErrorException e) {
            throw new RestApiException(CustomErrorCode.GOOGLE_AUTHORIZATION_ERROR);
        }
    }

    private JwtToken makeJwtToken(String memberId) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, memberId+salt);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.generateToken(authentication);
    }

    private void createIfNewMember(String memberId, OAuthMemberInfoResponse res) {
        if (!memberRepository.existsById(memberId)) {
            Member member =
                    Member.builder()
                            .memberId(memberId)
                            .password(passwordEncoder.encode(memberId + salt))
                            .name(res.getName()==null? "" : res.getName())
                            .profileImage(res.getProfileUrl())
                            .nickname("User" + RandomStringUtils.randomAlphanumeric(8))
                            .roles(List.of("SOCIAL")).build();
            memberRepository.save(member);
        }
    }

}
