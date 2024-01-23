package com.a506.comeet.api.service.room;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.ChannelService;
import com.a506.comeet.app.room.service.LoungeService;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Slf4j
@Transactional
public class RoomEnterTest {

    @PersistenceContext
    EntityManager em;

    @Autowired
    RoomService roomService;

    @Autowired
    ChannelService channelService;

    @Autowired
    LoungeService loungeService;

    @Autowired
    RoomRepository roomRepository;

    @BeforeEach
    void init(){
        Long roomId = 3L;
        int N = 3;
        int M = 2;
        //given
        for (int i = 1; i <= N; i++) {
            em.persist(Member.builder().memberId("멤버"+i).nickname("닉네임"+i).build());
        }
        em.flush();
        em.clear();

        //방 생성
        for (int i = 1; i <= N; i++) {
            RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                    mangerId("멤버"+i).
                    title("title"+i).description("설명"+i).capacity(10).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                    build();
            roomService.createRoom(reqR);
        }

        // 방 가입
        for (int i = 1; i <= N; i++) {
            if ((long) i == roomId) continue;
            RoomJoinRequestDto req = new RoomJoinRequestDto("멤버"+i);
            roomService.joinMember(req, "멤버" + 3, roomId);
        }

        for (int i = 1; i <= M; i++) {
            channelService.createChannel(new ChannelCreateRequestDto(roomId, "채널명"+i));
            loungeService.createLounge(new LoungeCreateRequestDto(roomId, "라운지명"+i));
        }

    }

    @Test
    @Transactional
    void roomEnterTest(){
        Long roomId = 3L;
        int N = 100;
        int M = 100;
        RoomResponseDto res = roomRepository.enterRoomCustom(roomId);
        log.info("멤버 수 : {}", res.getMembers().size());
        for (RoomMemberResponseDto member : res.getMembers()) {
            log.info("멤버 닉네임 : {}", member.getNickname());
        }

        log.info("채널 수 : {}", res.getChannels().size());
        for (RoomChannelResponseDto channel : res.getChannels()) {
            log.info("채널 명 : {}", channel.getName());
        }

        log.info("라운지 수 : {}", res.getLounges().size());
        for (RoomLoungeResponseDto lounge : res.getLounges()) {
            log.info("라운지 명 : {}", lounge.getName());
        }
        Assertions.assertThat(res.getRoomId()).isEqualTo(3L);
        Assertions.assertThat(res.getMembers().size()).isEqualTo(N);
        Assertions.assertThat(res.getChannels().size()).isEqualTo(M);

    }

    @Test
    @Transactional
    void roomEnterTestOneQuery(){
        Long roomId = 3L;
        List<RoomResponseDto> response = roomRepository.enterRoomCustomOneQuery(roomId);
        for (RoomResponseDto res : response) {
            log.info("멤버 수 : {}", res.getMembers().size());
            for (RoomMemberResponseDto member : res.getMembers()) {
                log.info("멤버 닉네임 : {}", member.getNickname());
            }

            log.info("채널 수 : {}", res.getChannels().size());
            for (RoomChannelResponseDto channel : res.getChannels()) {
                log.info("채널 명 : {}", channel.getName());
            }

            log.info("라운지 수 : {}", res.getLounges().size());
            for (RoomLoungeResponseDto lounge : res.getLounges()) {
                log.info("라운지 명 : {}", lounge.getName());
            }
        }
    }

}
