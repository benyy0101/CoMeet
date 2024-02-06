package com.a506.comeet.common.base;

import com.a506.comeet.admin.controller.dto.KeywordRequestDto;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.service.KeywordService;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.MemberService;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
@Transactional
@RequiredArgsConstructor
public class InitData {

    private final MemberService memberService;
    private final RoomService roomService;
    private final KeywordService keywordService;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final KeywordRepository keywordRepository;

    // 애플리케이션 시작 후 초기 데이터 설정
    @PostConstruct
    public void initData() {
        // 회원 생성
        createMember("user1", "회원1", "User123!", "user1@example.com", "nickname1");
        createMember("user2", "회원2", "User123!", "user2@example.com", "nickname2");
        createMember("user3", "회원3", "User123!", "user3@example.com", "nickname3");
        createMember("user4", "회원4", "User123!", "user4@example.com", "nickname4");
        createMember("user5", "회원5", "User123!", "user5@example.com", "nickname5");

        // 키워드 생성
        createKeyword("Java");
        createKeyword("Node.js");
        createKeyword("React");
        createKeyword("Python");
        createKeyword("Javascript");

        // 일회용방 생성
        createRoom("user1", "자바 기초 스터디", "자바 프로그래밍을 처음 배우는 사람들을 위한 스터디방입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, List.of(1L));
        createRoom("user2", "Node.js 개발자 모임", "Node.js 개발 논의를 위한 전용 공간입니다.", 6, RoomConstraints.VIDEOON, RoomType.DISPOSABLE, Arrays.asList(2L, 3L));
        createRoom("user3", "리액트 인터랙티브 워크샵", "중급 학습자를 위한 인터랙티브 리액트 워크샵입니다.", 10, RoomConstraints.MICOFF, RoomType.DISPOSABLE, Arrays.asList(4L, 5L));
        createRoom("user4", "풀스택 개발 토론", "풀스택을 사용한 풀스택 개발에 대해 토론하는 장소입니다.", 9, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L));
        createRoom("user5", "파이썬 데이터 사이언스 학습", "파이썬을 사용한 데이터 사이언스 프로젝트에 대해 배우고 경험을 공유합니다.", 8, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L, 4L, 5L));

        // 지속방 생성
        createRoom("user1", "머신러닝 기초", "머신러닝 개념과 알고리즘에 대한 초보자 친화적 논의입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.PERMANENT, List.of(1L));
        createRoom("user2", "자바스크립트 고급 기술 탐구", "자바스크립트 프로그래밍의 고급 개념을 탐구합니다.", 6, RoomConstraints.VIDEOON, RoomType.PERMANENT, Arrays.asList(2L, 3L));
        createRoom("user3", "웹 개발 입문", "HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자 가이드입니다.", 10, RoomConstraints.MICOFF, RoomType.PERMANENT, Arrays.asList(4L, 5L));
        createRoom("user4", "AWS 클라우드 컴퓨팅", "아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론입니다.", 9, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L));
        createRoom("user5", "사이버 보안 기초", "사이버 보안의 기초와 온라인 존재를 보호하는 방법을 배웁니다.", 8, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L, 4L, 5L));

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

    private void createRoom(String managerId, String title, String description, int capacity, RoomConstraints constraints, RoomType type, List<Long> keywordIds) {
        Boolean exists = roomRepository.existsByTitle(title);
        if (!exists) {
            RoomCreateRequestDto req = RoomCreateRequestDto.builder()
                    .managerId(managerId)
                    .title(title)
                    .description(description)
                    .capacity(capacity)
                    .constraints(constraints)
                    .type(type)
                    .keywordIds(keywordIds)
                    .build();
            roomService.create(req);
        }
    }

    private void createKeyword(String name) {
        Boolean exists = keywordRepository.existsByName(name);
        if (!exists) {
            KeywordRequestDto req = KeywordRequestDto.builder()
                    .name(name)
                    .build();
            keywordService.create(req);
        }
    }
}