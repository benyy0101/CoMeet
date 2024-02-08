package com.a506.comeet.app.room;

import com.a506.comeet.app.room.controller.dto.RoomChannelResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomLoungeResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomMemberResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomResponseDto;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.ChannelService;
import com.a506.comeet.app.room.service.LoungeService;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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

//    @Test
//    @Rollback(value = false)
//    void init2(){
//        RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
//                mangerId("멤버10000").
//                title("title").description("설명").capacity(1000).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
//                build();
//        roomService.createRoom(reqR);
//
//        for (int i = 1; i <= 999; i++) {
//            RoomJoinRequestDto req = new RoomJoinRequestDto("멤버"+i);
//            roomService.joinMember(req, "멤버10000", 1L);
//        }
//
//        for (int i = 1; i <= 20; i++) {
//            channelService.createChannel(new ChannelCreateRequestDto(1L, "채널명"+i));
//            loungeService.createLounge(new LoungeCreateRequestDto(1L, "라운지명"+i));
//        }
//    }

    @Test
    @Transactional
    void roomEnterTest(){
        Long roomId = 3L;
        int N = 100;
        int M = 100;
        RoomResponseDto res = roomRepository.getDetailRoomInfo(roomId);
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

//    @Test
//    @Transactional
//    void roomEnterTestOneQuery(){
//        Long roomId = 3L;
//        List<RoomResponseDto> response = roomRepository.enterRoomCustomOneQuery(roomId);
//        for (RoomResponseDto res : response) {
//            log.info("멤버 수 : {}", res.getMembers().size());
//            for (RoomMemberResponseDto member : res.getMembers()) {
//                log.info("멤버 닉네임 : {}", member.getNickname());
//            }
//
//            log.info("채널 수 : {}", res.getChannels().size());
//            for (RoomChannelResponseDto channel : res.getChannels()) {
//                log.info("채널 명 : {}", channel.getName());
//            }
//
//            log.info("라운지 수 : {}", res.getLounges().size());
//            for (RoomLoungeResponseDto lounge : res.getLounges()) {
//                log.info("라운지 명 : {}", lounge.getName());
//            }
//        }
//    }
//
//    @Test
//    @Transactional
//    void roomEnterVsTest(){
//        Long srt = System.currentTimeMillis();
//        List<RoomResponseDto> res = roomRepository.enterRoomCustomOneQuery(1L);
//        log.info("one Query : {}",System.currentTimeMillis() - srt);
//        log.info("{}", res.size());
//        Long srt2 = System.currentTimeMillis();
//        roomRepository.enterRoomCustom(1L);
//        log.info("multiple Query : {}",System.currentTimeMillis() - srt2);
//    }

}
