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
import java.util.TimeZone;

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

        // 시간 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

        createMember("damongsanga", "덕주", "QWER1234!", "damongsanga@naver.com", "다몽상가");
        createMember("movinggun", "동건", "QWER1234!", "movinggun@naver.com", "무빙건");
        createMember("hyeeyon", "희연", "QWER1234!", "hyeeyon@naver.com", "희여니");
        createMember("yuroyuro", "유로", "QWER1234!", "yuroyuro@naver.com", "너는무료나는유로");
        createMember("benny", "태수", "QWER1234!", "benny@naver.com", "커피마니아");
        createMember("hyeonah", "현아", "QWER1234!", "hyeonah@naver.com", "혀나혀나");
        createMember("iammusk", "일론머스크", "QWER1234!", "iammusk@naver.com", "일롱므스큼다");
        createMember("iamaltman", "샘알트먼", "QWER1234!", "iamaltman@naver.com", "샘알트먼");
        createMember("iamson", "손흥민", "QWER1234!", "iamson@naver.com", "SONNY");
        createMember("iameminem", "에미넴", "QWER1234!", "iameminem@naver.com", "할미넴");
        createMember("iambeenzino", "빈지노", "QWER1234!", "iambeenzino@naver.com", "빈쥐노");
        createMember("iamjohnlennon", "존레논", "QWER1234!", "iamjohnlennon@naver.com", "요코팬");
        createMember("iamkimyoungha", "손흥민", "QWER1234!", "iamkimyoungha@naver.com", "김영하작가");
        createMember("iamsuka", "슈카", "QWER1234!", "iamsuka@naver.com", "슈카코믹스");
        createMember("iamson", "손흥민", "QWER1234!", "iamson@naver.com", "SONNY");
        createMember("iamson", "손흥민", "QWER1234!", "iamson@naver.com", "SONNY");


        // 키워드 생성
        createKeyword("Java"); //1
        createKeyword("Node.js"); //2
        createKeyword("React"); //3
        createKeyword("Python"); //4
        createKeyword("Javascript"); //5
        createKeyword("Unity"); //6
        createKeyword("BlockChain"); //7
        createKeyword("Algorithm"); //8
        createKeyword("AWS"); //9
        createKeyword("DOCKER"); //10
        createKeyword("AI"); //11
        createKeyword("C"); //12
        createKeyword("Vue.js"); //13
        createKeyword("Spring"); //14
        createKeyword("Typescript"); //15

        // 일회용방 생성 (1~6)
        createRoom("damongsanga", "자바 기초 스터디", "자바 프로그래밍을 처음 배우는 사람들을 위한 스터디방입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, List.of(1L));
        createRoom("movinggun", "Node.js 개발자 모임", "Node.js 개발 논의를 위한 전용 공간입니다.", 6, RoomConstraints.VIDEOON, RoomType.DISPOSABLE, Arrays.asList(2L, 3L));
        createRoom("hyeeyon", "리액트 인터랙티브 워크샵", "중급 학습자를 위한 인터랙티브 리액트 워크샵입니다.", 10, RoomConstraints.MICOFF, RoomType.DISPOSABLE, Arrays.asList(4L, 5L));
        createRoom("yuroyuro", "풀스택 개발 토론", "풀스택을 사용한 풀스택 개발에 대해 토론하는 장소입니다.", 9, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L));
        createRoom("benny", "파이썬 데이터 사이언스 학습", "파이썬을 사용한 데이터 사이언스 프로젝트에 대해 배우고 경험을 공유합니다.", 8, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 2L, 3L, 4L, 5L));
        createRoom("hyeonah", "알고리즘 스터디", "자바, 파이썬을 사용한 알고리즘 문제 풀이방입니다", 10, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 4L, 8L));

        // 지속방 생성 (7~13)
        createRoom("damongsanga", "블록체인 기초", "블록체인 개념과 암호화 알고리즘에 대한 초보자 친화적 논의입니다.", 5, RoomConstraints.VIDEOONMICOFF, RoomType.PERMANENT, List.of(7L));
        createRoom("movinggun", "자바스크립트 고급 기술 탐구", "자바스크립트 프로그래밍의 고급 개념을 탐구합니다.", 6, RoomConstraints.VIDEOON, RoomType.PERMANENT, Arrays.asList(2L, 3L, 5L));
        createRoom("hyeeyon", "웹 개발 입문", "HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자 가이드입니다.", 10, RoomConstraints.MICOFF, RoomType.PERMANENT, Arrays.asList(4L, 5L));
        createRoom("yuroyuro", "AWS 클라우드 컴퓨팅", "아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론입니다.", 9, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L));
        createRoom("benny", "사이버 보안 기초", "사이버 보안의 기초와 온라인 존재를 보호하는 방법을 배웁니다.", 8, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L, 4L, 5L));
        createRoom("hyeonah", "비전공자 기본 CS", "비전공자들을 위한 기초 운영체제, 네트워크 CS 스터디 방입니다.", 8, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 4L, 5L));
        createRoom("hyeonah", "모바일 게임 개발", "Unity를 이용한 모바일 게임 개발방입니다", 10, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(6L));

        // 추가 지속방 (14~21)
        createRoom("iammusk", "IT 기획", "기획자들을 위한 스터디입니다", 4, RoomConstraints.VIDEOONMICOFF, RoomType.PERMANENT, List.of());
        createRoom("yuroyuro", "WEB RTC 1달 마스터", "3월 1달간 운영되는 스터디로, WEB RTC 기술을 깊게 파봅니다!", 6, RoomConstraints.VIDEOON, RoomType.PERMANENT, Arrays.asList(6L));
        createRoom("benny", "13반 모여라", "주말마다 진행하는 13반 스터디! 싸탈 레츠고!", 20, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 2L, 3L, 4L, 6L));
        createRoom("damongsanga", "스프링 딥다이브", "스프링을 깊게 파보는 스터디입니다", 10, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(1L, 14L));
        createRoom("iamaltman", "LLM 논문 읽기", "매주 수요일, 1개 신규로 발행된 LLM 관련 논문을 읽고 내용을 공유합니다", 4, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(11L));
        createRoom("hyeonah", "프론트 스터디", "프레임워크에 한정되지 않은 프론트 스터디입니다", 10, RoomConstraints.MICOFF, RoomType.PERMANENT, Arrays.asList(3L, 5L, 13L));
        createRoom("iammusk", "남자라면 땀내나는 C를!", "진득하게 C 부터 다시 시작해보는 스터디입니다", 10, RoomConstraints.VIDEOON, RoomType.PERMANENT, Arrays.asList(12L));
        createRoom("movinggun", "[데브옵스] 주말 인프라 스터디", "토요일 오전마다 운영되는 인프라 스터디입니다", 10, RoomConstraints.FREE, RoomType.PERMANENT, Arrays.asList(9L, 10L));

        // 추가 일회용방 생성 (순서 바꾸면 안됨!!)
        createRoom("iammusk", "자바 스터디", "내 손을 java바~", 6, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L));
        createRoom("iamaltman", "vue 스터디", "솔직히 리액트보다 좋음 인정?", 7, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, Arrays.asList(5L, 13L));
        createRoom("iamson", "AWS 달려!", "오늘 불태운다 AWS!", 10, RoomConstraints.VIDEOON, RoomType.DISPOSABLE, Arrays.asList(9L));
        createRoom("iameminem", "쌍남자 C 레츠고", "남자는 C다. 마치 내 학점처럼", 8, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 4L, 8L));
        createRoom("iambeenzino", "AI 스터디", "난 AI 보다 랩을 잘해요 ㅋㅋ", 10, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, Arrays.asList(11L));
        createRoom("iamjohnlennon", "자바스크립트 vs 타입스크립트", "타입세이프한 개발로!", 6, RoomConstraints.VIDEOONMICOFF, RoomType.DISPOSABLE, Arrays.asList(5L, 15L));
        createRoom("iamkimyoungha", "알고리즘 설명회", "낭독회 만큼이나 알고리즘 풀이도 잘한답니다", 12, RoomConstraints.FREE, RoomType.DISPOSABLE, Arrays.asList(1L, 4L, 8L));
        createRoom("iamsuka", "코딩 초보자를 위한 CS 입문 특장", "코딩을 주식처럼 쉽게!", 10, RoomConstraints.VIDEOON, RoomType.DISPOSABLE, List.of());

        // 자유게시판
        createBoard("damongsanga", "자바 공부법", "자바 프로그래밍을 처음 배우는 사람들을 위한 스터디 방법입니다.",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("movinggun", "개발자의 일상", "개발하면서 겪은 재미있는 일화를 공유해요. 모두의 이야기를 기다립니다.",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("hyeeyon", "파이썬 데이터 분석 질문", "데이터 분석 중에 마주친 문제에 대해 질문합니다. 판다스 사용법이 궁금해요!",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("yuroyuro", "개발자를 위한 꿀팁!", "개발을 하면서 알게 된 유용한 팁들을 공유합니다. 시간 절약하는 팁 대환영!",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("hyeonah", "내 프로젝트 홍보", "새로 시작한 프로젝트를 소개하고 팀원을 모집합니다. 관심 있으신 분들은 연락주세요!",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);

        createBoard("damongsanga", "풀스택이라고 하셨잖아요!", "네. 풀스택 오버플로우요",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("hyeonah", "왜 개발자들은 다크모드를 좋아할까요?", "light 모드는 bug를 끌어들이니까요.. 살려주세요..",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("movinggun", "오늘 운동 뭐하지", "어제 하체 맛있게 먹었으니 오늘은 등으로 간다",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("benny", "곧 커피 엑스포가 열린대요", "90% 얼리버드 개꿀. 같이 가실분 구합니다!",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("iamaltman", "반도체 수급이 부족해요", "다시 회사로 복귀도 했으니 800조 정도는 투자를 받아야겠어요~",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("hyeeyon", "솔직히 생각해도", "로고는 너무 잘 뽑은 것 같아요 그렇죠?",  BoardType.FREE, FreeBoardCategory.CHAT, null);
        createBoard("yuroyuro", "윤딴딴 아세요?", "그 친구 뮤비를 제가 만들었습니다. 가서 빨리 조회수를 올려주시죠.",  BoardType.FREE, FreeBoardCategory.CHAT, null);

        createBoard("hyeeyon", "맛집 추천 프로젝트 모집", "맛집 추천 프로젝트를 같이 운영하실 프론트 엔드원을 모집합니다! 주말에 함께 4시간정도 시간 내서 코밋에서 함께 진행하실 수 있는 분 구해요~",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);
        createBoard("damongsanga", "작곡 AI 프로젝트 모집", "AI를 활용한 작곡 서비스를 함께 만들어가실 개발자를 모십니다! 관심 있으신 분들은 연락주세요!",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);
        createBoard("hyeonah", "사이드 프로젝트 함께하실 분 구합니다", "새로 시작한 프로젝트를 소개하고 팀원을 모집합니다. 관심 있으신 분들은 연락주세요!",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);
        createBoard("benny", "사진 SNS 프로젝트 홍보", "다음 달, 새로운 사진 SNS로 찾아오겠습니다! 많은 관심 부탁드려요~",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);
        createBoard("iammusk", "전기자 플랫폼 서비스 개발", "테슬라를 따라잡을 신규 전장 플랫폼을 기획하고 있습니다. 저희 팀에 관심 있으신 분들은 쪽지 주세요~",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);
        createBoard("yuroyuro", "교육 플랫폼 강사 모집", "제가 곧 런칭을 준비중인 플랫폼에 네트워크 수업을 해주실 강사분을 모집합니다! 관심 있으신 분들은 쪽지 주세요~",  BoardType.FREE, FreeBoardCategory.PROMOTION, null);

        createBoard("benny", "개꿀팁 공유", "다음에 팀장하고 싶은 사람 있냐고 하면 화장실 다녀오셈",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("movinggun", "아직도 명령어를 전부 다 치고 있으신가요?", "나만의 리눅스 명령어를 alias 로 등록하여 빠르고 쉽게 배포하세요!",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("hyeonah", "공유채팅으로 알고리즘 스터디하기", "알고 계셨나요? 코밋에는 공유 채팅 기능이 있다는 걸! 알고리즘 스터디에서 특히 유용하게 쓸 수 있아요 ㅎㅎ",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("iammusk", "진짜 개꿀팁 공유", "내가 트윗하면 코인 사셈. ㄹㅇ 개꿀팁임",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("iamaltman", "챗지피티 요금", "첫 한달은 무료로 사용할 수 있어요! GPT 4 뿐만 아니라 DALLE-3도 쉽게 사용 가능하다고요~ API는 별도 요금이니 참고하세요!",  BoardType.FREE, FreeBoardCategory.TIP, null);
        createBoard("yuroyuro", "화면공유 필터 쓰기", "화면 공유시 얼굴에 다양한 필터를 적용할 수 있어요. 이번 스터디 때 해보니까 재밌더라고요 ㅋㅋ",  BoardType.FREE, FreeBoardCategory.TIP, null);

        createBoard("hyeeyon", "JPA 질문", "read-only 트랜잭션 범위를 어디까지 잡아야 할 지 모르겠습니다. 컨트롤러에서 직접 사용하는 퍼블릭 서비스 메소드 기준으로 트랜잭션을 나눠야 할까요, 아니면 protected로 꼭 필요한 부분만 @Transactional을 사용하고 나머지는 read-only로 진행해도 되는걸까요?",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("movinggun", "쿠버네티스 분석 질문", "쿠버네티스를 많이 사용해보신 분들 있으실까요? 설치 방법이 궁금합니다!",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("damongsanga", "CSRF 공격 질문", "Referer 검증 외에 CSRF 공격을 막을 수 있는 방법이 무엇이 있을까요?",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("hyeonah", "CORS 에러..", "백과 연동하면서 계속 CORS 에러가 발생합니다.. Access-Control-Allow-Origin 설정을 해야된다고 하는데 어떻게 해야 할까요?",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("iammusk", "DB 선택에 고민이 있습니다.", "이번 프로젝트 때 RDBMS를 MySQL로 할지 PostgreSQL을 사용할지 모르겠어요.. 둘 다 사용해 보신분들 혹시 어떤 DB가 좋을까요?",  BoardType.FREE, FreeBoardCategory.QUESTION, null);
        createBoard("benny", "git 전략", "애자일한 git 전략에는 어떤 것들이 있고, 실무에서는 어떤 git 전략을 많이 사용하나요? 현직자분들의 조언이 필요합니다!",  BoardType.FREE, FreeBoardCategory.QUESTION, null);


        // 모집 게시판
        createBoard("damongsanga", "블록체인 프로젝트 참여자", "이더리움 기반의 스마트 컨트랙트 개발 프로젝트입니다. 관심있는 분들의 많은 참여 바랍니다.", BoardType.RECRUIT, null, 7L);
        createBoard("movinggun", "자바스크립트 고급 기술 탐구", "자바스크립트 프로그래밍의 고급 개념을 탐구할 팀원을 모집합니다.", BoardType.RECRUIT, null, 8L);
        createBoard("hyeeyon", "웹 개발 입문", "HTML, CSS, 자바스크립트를 이용한 웹 개발 초보자들 함께해요!.", BoardType.RECRUIT, null, 9L);
        createBoard("yuroyuro", "AWS 클라우드 컴퓨팅", "아마존 웹 서비스를 이용한 클라우드 컴퓨팅 서비스에 대한 토론할 팀원을 모집합니다.", BoardType.RECRUIT, null, 10L);
        createBoard("benny", "사이버 보안 기초", "사이버 보안의 기초와 온라인 존재를 보호하는 방법을 같이 배워봐요.", BoardType.RECRUIT, null, 11L);
        createBoard("hyeonah", "비전공자 기본 CS 모집", "비전공자들을 위한 기초 운영체제, 네트워크 CS 스터디 팀원을 모집합니다!", BoardType.RECRUIT, null, 12L);
        createBoard("hyeonah", "모바일 게임 개발 프로젝트", "Unity를 이용한 모바일 게임 개발에 참여할 분을 모집합니다. 게임에 열정적인 분 환영!", BoardType.RECRUIT, null, 13L);

        createBoard("iammusk", "IT 기획 모집", "IT 업계 기획으로 준비하시는분! 함께해요!", BoardType.RECRUIT, null, 14L);
        createBoard("yuroyuro", "WEB RTC 1달 마스터 모집합니다", "저와 함께라면 한달만에 RTC 마스터 쌉가능입니다", BoardType.RECRUIT, null, 15L);
        createBoard("benny", "13반 여기로 신청 ㄱㄱ", "13반 이제는 코밋에서 모여", BoardType.RECRUIT, null, 16L);
        createBoard("damongsanga", "스프링 딥다이브 모집!!", "스프링 진득하게 파볼분! 토비와 김영한님의 가호를 받아 레츠고!!!", BoardType.RECRUIT, null, 17L);
        createBoard("iamaltman", "LLM 논문 읽기 모임", "솔직히 1주일에 1개 논문 쌉 EZ 인정??", BoardType.RECRUIT, null, 18L);
        createBoard("hyeonah", "@@@@@프론트 스터디@@@@@", "@@@@@프론트마스터가 될꺼에요 함께하실분???@@@@@", BoardType.RECRUIT, null, 19L);
        createBoard("iammusk", "마 남자 아이가, 남자라면 땀내나는 C를!", "여자 개발자분들도 환영합니다", BoardType.RECRUIT, null, 20L);


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

        createComment(1L, commentsForJava.get(0), "movinggun");
        createComment(1L, commentsForJava.get(0), "hyeeyon");
        createComment(1L, commentsForJava.get(0), "yuroyuro");
        createComment(1L, commentsForJava.get(0), "benny");
        createComment(1L, commentsForJava.get(0), "hyeonah");


        createComment(1L, "제네릭스 부분이 아직 어려운데, 누군가 설명해 줄 수 있나요?", "hyeeyon");
        createComment(1L, "자바의 가비지 컬렉션에 대해 알게 되어 유익했어요.", "movinggun");
        createComment(1L, "예외 처리 방법에 대한 세션도 추가되면 좋을 것 같아요.", "yuroyuro");
        createComment(1L, "JVM이 실제로 어떻게 작동하는지 궁금했는데, 설명해주셔서 감사합니다!", "damongsanga");
        createComment(1L, "다음 스터디 모임은 언제인가요? 참여하고 싶습니다.", "benny");

        createComment(10L, "컴포넌트 라이프사이클에 대해 배울 수 있어서 좋았어요.", "damongsanga");
        createComment(10L, "Hook을 사용한 상태 관리 예제가 정말 도움이 되었습니다.", "benny");
        createComment(10L, "리액트 라우터를 사용한 SPA 구현 부분이 인상적이었어요.", "hyeonah");
        createComment(10L, "Context API 사용 방법을 자세히 알게 되어서 유익했습니다.", "movinggun");
        createComment(10L, "다음 워크샵도 기대되네요. 언제 열리나요?", "yuroyuro");


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