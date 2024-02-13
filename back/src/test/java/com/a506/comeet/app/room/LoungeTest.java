package com.a506.comeet.app.room;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.LoungeRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.LoungeService;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
public class LoungeTest {

    @Autowired
    private LoungeService loungeService;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private LoungeRepository loungeRepository;

    @Test
    @Transactional
    void createTest(){
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        Lounge lounge = loungeService.create(req, "멤버1");

        for (Lounge c : loungeRepository.findAll()) {
            log.info("id : {}", lounge.getId());
            log.info("name : {}", lounge.getName());
            log.info("roomTitle : {}", lounge.getRoom().getTitle());
        }
        assertThat(loungeRepository.findAll().get(0).getName()).isEqualTo("lounge1");
    }

    @Test
    @Transactional
    void updateTest(){
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        Lounge lounge = loungeService.create(req, "멤버1");
        lounge = loungeRepository.findAll().get(0);

        LoungeUpdateRequestDto req2 = new LoungeUpdateRequestDto("lounge2");
        loungeService.update(req2, lounge.getId(), "멤버1");

        log.info("id : {}", lounge.getId());
        log.info("name : {}", lounge.getName());
        log.info("roomTitle : {}", lounge.getRoom().getTitle());

        assertThat(loungeRepository.findById(lounge.getId()).get().getName()).isEqualTo("lounge2");
    }

    @Test
    @Transactional
    void deleteTest(){
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        loungeService.create(req, "멤버1");
        Lounge lounge = loungeRepository.findAll().get(0);

        assertThat(room.getLounges().size()).isEqualTo(1);
        loungeService.delete(lounge.getId(), "멤버1");
        assertThat(room.getLounges().size()).isEqualTo(0);
    }

    @Test
    @Transactional
    void roomDeleteTest(){
        Room room = roomRepository.findByTitle("title").get();
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        loungeService.create(req, "멤버1");
        Lounge lounge = loungeRepository.findAll().get(0);

        room.delete();
        assertThat(room.getLounges().size()).isEqualTo(0);
    }

}

