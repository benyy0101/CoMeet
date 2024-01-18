package com.a506.comeet.api.service.room;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.dto.*;
import com.a506.comeet.room.service.ChannelService;
import com.a506.comeet.room.service.LoungeService;
import com.a506.comeet.room.service.RoomService;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
public class RoomEnterTest {

    @Autowired
    private EntityManager em;

    @Autowired
    RoomService roomService;

    @Autowired
    ChannelService channelService;

    @Autowired
    LoungeService loungeService;


    @Test
    @Transactional
    @Rollback(value = false)
    void test(){

        Long roomId = 3L;
        RoomResponseDto res = roomService.enterRoom(roomId);

        log.info("멤버 수 : {}", res.getMembers().size());
        for (RoomMemberResponseDto member : res.getMembers()) {
            log.info("멤버 닉네임 : {}", member.getNickname());
        }

        log.info("채널 수 : {}", res.getChannels().size());
        for (RoomChannelResponseDto channel : res.getChannels()) {
            log.info("채널 명 : ", channel.getName());
        }

        log.info("라운지 수 : {}", res.getLounges().size());
        for (RoomLoungeResponseDto lounge : res.getLounges()) {
            log.info("라운지 명 : ", lounge.getName());
        }
    }

    @BeforeEach
    void init(){

        Long roomId = 3L;

        //given
        // Manager 멤버 생성
        Member manager = Member.builder().memberId("매니저").build();
        em.persist(manager);
        for (int i = 1; i <= 100; i++) {
            em.persist(Member.builder().memberId("멤버"+i).nickname("닉네임"+i).build());
        }
        em.flush();
        em.clear();

        //방 생성
        for (int i = 1; i < 100; i++) {
            RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                    mangerId("멤버"+i).
                    title("title"+i).description("설명"+i).capacity(10).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                    build();
            roomService.createRoom(reqR);
        }


        for (int i = 1; i <= 100; i++) {
            RoomJoinRequestDto req = new RoomJoinRequestDto("멤버"+i);
            roomService.joinMember(req, "멤버" + roomId, roomId);
        }

        for (int i = 0; i < 20; i++) {
            channelService.createChannel(new ChannelCreateRequestDto(roomId, "채널명"+i));
            loungeService.createLounge(new LoungeCreateRequestDto(roomId, "라운지명"+i));
        }

    }
}
