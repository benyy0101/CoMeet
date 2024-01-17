package com.a506.comeet;

import com.a506.comeet.common.enums.RoomConstraint;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.RoomCreateRequestDto;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.repository.RoomRepository;
import com.a506.comeet.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
public class SimpleTests {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Test
    @DisplayName("프록시 객체의 pk로 접근할 때, 프록시 객체는 초기화되지 않는다")
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
                mangerId("멤버1").
                title("title").description("설명").capacity(10).constraint(RoomConstraint.FREE).type(RoomType.PERMANENT).
                build();
        Room newRoom = roomService.createRoom(reqR);

        log.info("방 생성");

        Room newRoom2 = roomRepository.findById(newRoom.getId()).get();

        log.info("매니저 이름 : {}", newRoom2.getManager().getMemberId());
    }
}
