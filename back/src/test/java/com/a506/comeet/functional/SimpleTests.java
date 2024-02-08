package com.a506.comeet.functional;

import com.a506.comeet.common.util.AES128Util;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
@Transactional
public class SimpleTests {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AES128Util aes128Util;

    @Test
    @DisplayName("프록시 객체의 pk로 접근할 때, 프록시 객체는 초기화되지 않는다")
    @Transactional
    void proxyPkTest() {
        //given
        // Manager 멤버 생성
        Member manager = Member.builder().memberId("멤버1").build();
        em.persist(manager);
        em.flush();
        em.clear();

        log.info("멤버 생성");

        //방 생성
        RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                managerId("멤버1").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                build();
        Room newRoom = roomService.create(reqR, "멤버1");

        log.info("방 생성");

        Room newRoom2 = roomRepository.findById(newRoom.getId()).get();

        log.info("매니저 이름 : {}", newRoom2.getManager().getMemberId());
    }

    @Test
    @Transactional
    void springdatajpaqueryTest(){
        Member manager = Member.builder().memberId("멤버1").build();
        Member newManager = Member.builder().memberId("멤버2").build();
        em.persist(manager);
        em.persist(newManager);
        em.flush();
        em.clear();

        RoomCreateRequestDto req = RoomCreateRequestDto.builder().
                managerId("멤버1").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.DISPOSABLE).
                build();

        Room room = roomService.create(req, manager.getMemberId());

        Room foundRoom = roomRepository.findById(room.getId()).get();

        log.info("room : {}", foundRoom.getTitle());

    }

    @Test
    void test(){
        String str = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1vbmdzYW5nYSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MDY5NDM0MTV9.W1pAabPr6S5a2bjMSMpm8kmwsn7tG3Yzn3K4exiGKDg";
        String encrypt = aes128Util.encryptAes(str);
        String decrypt = aes128Util.decryptAes(encrypt);
        Assertions.assertThat(str).isEqualTo(decrypt);
    }

}
