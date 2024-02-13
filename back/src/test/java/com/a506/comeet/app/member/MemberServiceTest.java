package com.a506.comeet.app.member;

import com.a506.comeet.app.member.service.MemberService;
import com.a506.comeet.common.enums.MemberFeature;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
class MemberServiceTest {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void init(){
        MemberSigninRequestDto req = MemberSigninRequestDto.builder()
                .memberId("멤버아이디1")
                .email("111@email.com")
                .password("asdfASDF12@")
                .nickname("닉네임1")
                .name("이름")
                .build();
        memberService.create(req);
    }
    @Test
    @Transactional
    void createTest(){

    }

    @Test
    @Transactional
    void updateTest(){
        MemberUpdateRequestDto req = MemberUpdateRequestDto.builder()
                        .name("이름").description("설명").feature(MemberFeature.EARTH).email("newEmail@naber.com")
                .password("newASDF12@").nickname("새닉네임").profileImage("profileImageLink").build();
        memberService.update(req, "멤버아이디1");
        Member member = memberRepository.findById("멤버아이디1").get();
        assertThat(member.getEmail()).isEqualTo("newEmail@naber.com");
        assertThat(member.getFeature()).isEqualTo(MemberFeature.EARTH);
    }

    @Test
    @Transactional
    void deleteTest(){
        memberService.delete("멤버아이디1");
        Member member = memberRepository.findById("멤버아이디1").orElse(null);
        assertThat(member).isEqualTo(null);
        Member deletedMember = memberRepository.findById("멤버아이디1").get();
    }

    @Test
    @Transactional
    void duplicateTest(){
        MemberDuplicationRequestDto req = MemberDuplicationRequestDto.builder().memberId("멤버아이디1").build();
        assertThat(memberService.duplicationValid(req)).isFalse();
        MemberDuplicationRequestDto req2 = MemberDuplicationRequestDto.builder().nickname("닉네임1").build();
        assertThat(memberService.duplicationValid(req2)).isFalse();
        MemberDuplicationRequestDto req3 = MemberDuplicationRequestDto.builder().nickname("닉네임12").build();
        assertThat(memberService.duplicationValid(req3)).isTrue();
    }


}