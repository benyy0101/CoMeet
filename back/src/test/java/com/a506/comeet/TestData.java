package com.a506.comeet;

import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.member.controller.dto.FollowRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.FollowService;
import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomJoinRequestDto;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.ChannelService;
import com.a506.comeet.app.room.service.LoungeService;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Slf4j
@Transactional
public class TestData {
    @Autowired
    private RoomRepository roomRepository;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private KeywordRepository keywordRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private FollowService followService;

    @Autowired
    ChannelService channelService;

    @Autowired
    LoungeService loungeService;

    @Test
    @Rollback(value = false)
    void init() {
        em.clear();
        int N = 1000;
        for (int i = 1; i <= N; i++) {
            em.persist(Member.builder().memberId("멤버" + i).build());
        }
        em.flush();
        em.clear();

        String memberId = "멤버" + N;

        // 모든 멤버가 멤버N을 팔로우한다
        for (int i = 1; i <= N - 1; i++) {
            followService.follow(new FollowRequestDto(memberId), "멤버" + i);
        }

        // 모든 멤버를 멤버N가 팔로우한다
        for (int i = 1; i <= N - 1; i++) {
            followService.follow(new FollowRequestDto("멤버" + i), memberId);
        }
        em.flush();
    }

    @Test
    @Rollback(value = false)
    void init2(){
        RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                managerId("멤버1000").
                title("title").description("설명").capacity(1000).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                build();
        Long roomId = roomService.create(reqR).getId();

        for (int i = 1; i <= 999; i++) {
            RoomJoinRequestDto req = new RoomJoinRequestDto("멤버"+i);
            roomService.join(req, "멤버1000", roomId);
        }

        for (int i = 1; i <= 20; i++) {
            channelService.create(new ChannelCreateRequestDto(roomId, "채널명"+i), "멤버1000");
            loungeService.create(new LoungeCreateRequestDto(roomId, "라운지명"+i), "멤버1000");
        }
    }

    @Test
    @Rollback(value = false)
    void init3(){
        Long keywordId1 = keywordRepository.save(new Keyword("자바")).getId();
        Long keywordId2 = keywordRepository.save(new Keyword("파이썬")).getId();
        Long keywordId3 = keywordRepository.save(new Keyword("자바스크립트")).getId();
        keywordRepository.save(new Keyword("고"));
        keywordRepository.save(new Keyword("레츠고"));

        //방 생성
        for (int i = 1; i <= 1000; i++) {
            RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                    managerId("멤버1000").
                    title("title"+i).description("설명"+i).capacity(9).constraints(RoomConstraints.FREE).keywordIds(List.of(keywordId1, keywordId2, keywordId3)).type(RoomType.PERMANENT).
                    build();
            roomService.create(reqR);
        }

    }


}
