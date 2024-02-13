package com.a506.comeet.app.etc;

import com.a506.comeet.app.etc.controller.dto.*;
import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.etc.repository.TilRepository;
import com.a506.comeet.app.etc.service.TilService;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class TilServiceTest {

    @Autowired
    TilService tilService;

    @Autowired
    TilRepository tilRepository;

    @Autowired
    MemberRepository memberRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    @Transactional
    void createTest(){
        memberRepository.save(Member.builder().memberId("멤버1").name("이름").nickname("닉네임").email("wss@email.com").password("password").build());
        Til created = tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,3)).context("안녕").build(), "멤버1");
        Member member = memberRepository.findById("멤버1").get();
        assertThat(member.getTils().size()).isEqualTo(1);
        assertThat(created.getMember().getMemberId()).isEqualTo("멤버1");
    }

    @Test
    @Transactional
    void updateTest(){
        memberRepository.save(Member.builder().memberId("멤버1").build());

        Til created = tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,3)).context("안녕").build(), "멤버1");
        Member member = memberRepository.findById("멤버1").get();

        tilService.update(TilUpdateRequestDto.builder().context("안녕22").build(), created.getId(), "멤버1");

        assertThat(created.getContext()).isEqualTo("안녕22");
    }

    @Test
    @Transactional
    void deleteTest(){
        em.persist(Member.builder().memberId("멤버1").build());
        em.flush();
        em.clear();

        Til created = tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,3)).context("안녕").build(), "멤버1");
        Member member = memberRepository.findById("멤버1").get();

        tilService.delete(created.getId(), "멤버1");

        Til deleted = tilRepository.findById(created.getId()).orElse(null);

        assertThat(deleted).isNull();
    }

    @Test
    @Transactional
    void searchTest(){
        em.persist(Member.builder().memberId("멤버1").build());
        em.flush();
        em.clear();

        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,3)).context("O1").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,3)).context("O2").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 2,3)).context("X1").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 3,3)).context("X2").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2023, 1,3)).context("X3").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 1,31)).context("O3").build(), "멤버1");
        tilService.create(TilCreateRequestDto.builder().date(LocalDate.of(2024, 2,1)).context("X4").build(), "멤버1");

        TilResponseDto res = tilService.find(1L);
        TilListResponseDto resList = tilService.findList(TilSearchRequestDto.builder().year(2024).month(1).build(), "멤버1");

        assertThat(res.getContext()).isEqualTo("O1");

        assertThat(resList.getContent().size()).isEqualTo(3);

    }

}