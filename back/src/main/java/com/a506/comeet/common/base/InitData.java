package com.a506.comeet.common.base;

import com.a506.comeet.admin.controller.dto.KeywordRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.board.repository.CommentRepository;
import com.a506.comeet.app.board.service.BoardService;
import com.a506.comeet.app.board.service.CommentService;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.service.KeywordService;
import com.a506.comeet.app.member.controller.dto.FollowRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.FollowRepository;
import com.a506.comeet.app.member.repository.LikeRepository;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.FollowService;
import com.a506.comeet.app.member.service.MemberService;
import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.ChannelRepository;
import com.a506.comeet.app.room.repository.LoungeRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.ChannelService;
import com.a506.comeet.app.room.service.LoungeService;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
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
    private final BoardService boardService;
    private final FollowService followService;
    private final ChannelService channelService;
    private final LoungeService loungeService;
    private final CommentService commentService;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final KeywordRepository keywordRepository;
    private final BoardRepository boardRepository;
    private final LikeRepository likeRepository;
    private final FollowRepository followRepository;
    private final ChannelRepository channelRepository;
    private final LoungeRepository loungeRepository;
    private final CommentRepository commentRepository;

    // 애플리케이션 시작 후 초기 데이터 설정
    @PostConstruct
    public void initData() {
        // 회원 생성
        for (int i = 1; i <= 10; i++) {
            String userId = "user" + i;
            String name = "회원" + i;
            String password = "User123!";
            String email = userId + "@example.com";
            String nickname = "nickname" + i;

            createMember(userId, name, password, email, nickname);
        }

        // 키워드 생성
        createKeyword("Java");
        createKeyword("Node.js");
        createKeyword("React");
        createKeyword("Python");
        createKeyword("Javascript");

        // 일회용방 생성
        for (int i = 1; i <= 15; i++)
            createRoom("user" + (i % 5 + 1), "일회용방 주제 " + i, "일회용방 설명 " + i, 5 + i % 3, RoomConstraints.values()[i % RoomConstraints.values().length], RoomType.DISPOSABLE, List.of((long) i % 5 + 1));
        createRoom("user1", "자바 기초 스터디", "자바 프로그래밍을 처음 배우는 사람들을 위한 스터디방입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, List.of(1L));
        createRoom("user2", "Node.js 개발자 모임", "Node.js 개발 논의를 위한 전용 공간입니다.", 6, RoomConstraints.VIDEOON, RoomType.DISPOSABLE, Arrays.asList(2L, 3L));
        createRoom("user3", "리액트 인터랙티브 워크샵", "중급 학습자를 위한 인터랙티브 리액트 워크샵입니다.", 10, RoomConstraints.MICOFF, RoomType.DISPOSABLE, Arrays.asList(4L, 5L));
        createRoom("user4", "풀스택 개발 토론", "풀스택을 사용한 풀스택 개발에 대해 토론하는 장소입니다.", 9, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L));
        createRoom("user5", "파이썬 데이터 사이언스 학습", "파이썬을 사용한 데이터 사이언스 프로젝트에 대해 배우고 경험을 공유합니다.", 8, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L, 4L, 5L));

        // 지속방 생성
        for (int i = 1; i <= 15; i++)
            createRoom("user" + (i % 5 + 1), "지속방 주제 " + i, "지속방 설명 " + i, 5 + i % 3, RoomConstraints.values()[i % RoomConstraints.values().length], RoomType.PERMANENT, Arrays.asList((long) i % 5 + 1, (long) (i + 1) % 5 + 1));
        createRoom("user1", "머신러닝 기초", "머신러닝 개념과 알고리즘에 대한 초보자 친화적 논의입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.PERMANENT, List.of(1L));
        createRoom("user2", "자바스크립트 고급 기술 탐구", "자바스크립트 프로그래밍의 고급 개념을 탐구합니다.", 6, RoomConstraints.VIDEOON, RoomType.PERMANENT, Arrays.asList(2L, 3L));
        createRoom("user3", "웹 개발 입문", "HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자 가이드입니다.", 10, RoomConstraints.MICOFF, RoomType.PERMANENT, Arrays.asList(4L, 5L));
        createRoom("user4", "AWS 클라우드 컴퓨팅", "아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론입니다.", 9, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L));
        createRoom("user5", "사이버 보안 기초", "사이버 보안의 기초와 온라인 존재를 보호하는 방법을 배웁니다.", 8, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L, 4L, 5L));

        // 자유게시판 생성
        for (int i = 1; i <= 15; i++)
            createBoard("user" + (i % 5 + 1), "자유게시판 주제 " + i, "자유게시판 내용 " + i, BoardType.FREE, FreeBoardCategory.values()[i % FreeBoardCategory.values().length], null);
        createBoard("user1", "자바 공부법", "자바 프로그래밍을 처음 배우는 사람들을 위한 스터디 방법입니다.",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("user2", "개발자의 일상", "개발하면서 겪은 재미있는 일화를 공유해요. 모두의 이야기를 기다립니다.",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("user3", "파이썬 데이터 분석 질문", "데이터 분석 중에 마주친 문제에 대해 질문합니다. 판다스 사용법이 궁금해요!",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("user4", "개발자를 위한 꿀팁!", "개발을 하면서 알게 된 유용한 팁들을 공유합니다. 시간 절약하는 팁 대환영!",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("user5", "내 프로젝트 홍보", "새로 시작한 프로젝트를 소개하고 팀원을 모집합니다. 관심 있으신 분들은 연락주세요!",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);

        // 모집게시판 생성
        for (int i = 1; i <= 15; i++)
            createBoard("user" + (i % 5 + 1), "모집게시판 주제 " + i, "모집게시판 내용 " + i, BoardType.RECRUIT, null, (long)(20+i));
        createBoard("user1", "새로운 웹 앱 프로젝트 팀원 모집", "React와 Node.js를 사용한 웹 애플리케이션을 개발할 팀원을 모집합니다.", BoardType.RECRUIT, null, 36L);
        createBoard("user2", "알고리즘 스터디 그룹", "알고리즘 문제 풀이를 함께할 스터디 멤버를 찾습니다. 주 1회 온라인 모임 예정.", BoardType.RECRUIT, null, 37L);
        createBoard("user3", "블록체인 프로젝트 참여자", "이더리움 기반의 스마트 컨트랙트 개발 프로젝트입니다. 관심있는 분들의 많은 참여 바랍니다.", BoardType.RECRUIT, null, 38L);
        createBoard("user4", "인공지능 학습 모델 개발", "딥러닝을 활용한 이미지 인식 모델 개발 프로젝트입니다. 텐서플로우/케라스 경험자 우대.", BoardType.RECRUIT, null, 39L);
        createBoard("user5", "모바일 게임 개발 프로젝트", "Unity를 이용한 모바일 게임 개발에 참여할 분을 모집합니다. 게임에 열정적인 분 환영!", BoardType.RECRUIT, null, 40L);

        // 댓글 생성
        List<String> commentsForJava = Arrays.asList(
                "자바는 정말 다재다능한 언어인 것 같아요.",
                "자바 기초부터 차근차근 배워보려고 합니다. 좋은 정보 감사합니다!",
                "자바 스터디에 참여하고 싶어요. 어떻게 신청하나요?",
                "이클립스와 인텔리제이 중 어떤 IDE를 사용하는 게 더 좋을까요?",
                "자바8의 스트림 API 정말 편리한 것 같아요."
        );

        List<String> commentsForReact = Arrays.asList(
                "리액트 시작하기 전에 자바스크립트 기초를 탄탄히 하는 게 중요하다고 들었어요.",
                "리액트로 SPA 개발할 때 상태 관리가 정말 중요한 포인트인 것 같아요.",
                "함수형 컴포넌트와 클래스 컴포넌트 중에 선호하는 건 무엇인가요?",
                "리액트 훅 사용법이 아직 어렵네요. 좋은 학습 자료 있으면 공유 부탁드려요!",
                "리액트 네이티브로 모바일 앱 개발해보신 분 계신가요? 경험을 듣고 싶어요."
        );

        // 댓글 생성
        for (int i = 1; i < 5; i++) {
            for(int j = 0; j < 5; j++) {
                System.out.println("================================");
                System.out.println(commentsForJava.get(j));
                createComment((long) (15 + i), commentsForJava.get(j), "user" + i);
                createComment((long) (35 + i), commentsForReact.get(j), "user" + i);
            }
        }

        createComment(20L, "제네릭스 부분이 아직 어려운데, 누군가 설명해 줄 수 있나요?", "user1");
        createComment(20L, "자바의 가비지 컬렉션에 대해 알게 되어 유익했어요.", "user2");
        createComment(20L, "예외 처리 방법에 대한 세션도 추가되면 좋을 것 같아요.", "user3");
        createComment(20L, "JVM이 실제로 어떻게 작동하는지 궁금했는데, 설명해주셔서 감사합니다!", "user4");
        createComment(20L, "다음 스터디 모임은 언제인가요? 참여하고 싶습니다.", "user5");

        createComment(40L, "컴포넌트 라이프사이클에 대해 배울 수 있어서 좋았어요.", "user1");
        createComment(40L, "Hook을 사용한 상태 관리 예제가 정말 도움이 되었습니다.", "user2");
        createComment(40L, "리액트 라우터를 사용한 SPA 구현 부분이 인상적이었어요.", "user3");
        createComment(40L, "Context API 사용 방법을 자세히 알게 되어서 유익했습니다.", "user4");
        createComment(40L, "다음 워크샵도 기대되네요. 언제 열리나요?", "user5");

        //좋아요 생성
        for (int i = 10; i <= 20; i++) {
            for (int j = 1; j <= i-10; j++) {
                addLike((long) i, "user" + j);
                addLike((long) (i+20), "user" + j);
            }
        }

        addLike(16L, "user8");
        addLike(16L, "user9");
        addLike(16L, "user10");
        addLike(36L, "user8");
        addLike(36L, "user9");
        addLike(36L, "user10");

        //팔로우 생성
        follow("user1", "user2");
        follow("user1", "user3");
        follow("user2", "user1");
        follow("user3", "user1");
        follow("user4", "user1");
        follow("user5", "user1");
        follow("user5", "user1");
        follow("user6", "user2");
        follow("user7", "user2");
        follow("user8", "user3");
        follow("user9", "user10");

        //채널 생성
        for(int i=1; i<=3; i++) {
            for(int j=1; j<=5; j++) {
                createChannel((long)(15+j), "채널" + i);
                createLounge((long)(15+j), "라운지" + i);
                createChannel((long)(35+j), "채널" + i);
                createLounge((long)(35+j), "라운지" + i);
            }
        }
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
            req.setRoles(List.of("USER"));
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
            roomService.create(req, managerId);
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

    private void createBoard(String writerId, String title, String content, BoardType type, FreeBoardCategory category, Long roomId) {
        Boolean exists = boardRepository.existsByTitle(title);
        if (!exists) {
            BoardCreateRequestDto req = BoardCreateRequestDto.builder()
                    .writerId(writerId)
                    .title(title)
                    .content(content)
                    .type(type)
                    .category(category)
                    .roomId(roomId)
                    .build();
            boardService.create(req, writerId);
        }
    }

    private void createComment(Long boardId, String content, String memberId) {
        Boolean exists = commentRepository.existsByBoardIdAndContent(boardId, content);
        if (!exists) {
            CommentCreateRequestDto req = CommentCreateRequestDto.builder()
                    .boardId(boardId)
                    .content(content)
                    .build();
            commentService.create(req, memberId);
        }
    }

    private void addLike(Long boardId, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Boolean exists = likeRepository.existsByBoardAndMember(board, member);
        if (!exists) {
            boardService.addLike(boardId, memberId);
        }
    }

    private void follow(String memberId, String fromId){
        Boolean exists = followRepository.existsByFromMemberIdAndToMemberId(fromId, memberId);
        if (!exists) {
            FollowRequestDto req = FollowRequestDto.builder()
                    .memberId(memberId)
                    .build();
            followService.follow(req, fromId);
        }
    }

    private void createChannel(Long roomId, String name){
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Boolean exists = channelRepository.existsByRoomAndName(room, name);
        if (!exists) {
            ChannelCreateRequestDto req = ChannelCreateRequestDto.builder()
                    .roomId(roomId)
                    .name(name)
                    .build();
            channelService.create(req, room.getManager().getMemberId());
        }
    }

    private void createLounge(Long roomId, String name){
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Boolean exists = loungeRepository.existsByRoomAndName(room, name);
        if (!exists) {
            LoungeCreateRequestDto req = LoungeCreateRequestDto.builder()
                    .roomId(roomId)
                    .name(name)
                    .build();
            loungeService.create(req, room.getManager().getMemberId());
        }
    }
}