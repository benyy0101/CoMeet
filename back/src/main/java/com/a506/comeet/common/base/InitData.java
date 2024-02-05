package com.a506.comeet.common.base;

import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.MemberService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InitData {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 애플리케이션 시작 후 초기 데이터 설정
    @PostConstruct
    public void initData() {
        // 회원 데이터 생성 및 저장 예시
        createMember("user1", "회원1", "User123!", "user1@example.com", "nickname1");
        createMember("user2", "회원2", "User123!", "user2@example.com", "nickname2");
        createMember("user3", "회원3", "User123!", "user3@example.com", "nickname3");
        createMember("user4", "회원4", "User123!", "user4@example.com", "nickname4");
        createMember("user5", "회원5", "User123!", "user5@example.com", "nickname5");
    }

    private void createMember(String memberId, String name, String password, String email, String nickname) {
        Boolean exists = memberRepository.existsByMemberIdOrEmailOrNickname(memberId, email, nickname);
        if (!exists) {
            MemberSigninRequestDto req = MemberSigninRequestDto.builder()
                    .memberId(memberId)
                    .name(name)
                    .password(password)
                    .email(email)
                    .nickname(nickname)
                    .build();
            memberService.create(req);
        }
    }
}