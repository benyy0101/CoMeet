package com.a506.comeet.api.service.lounge;

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
public class LoungeCUDTest {

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

    private Member manager;

    private Room room;

    @BeforeEach
    public void init(){
        manager = Member.builder().memberId("멤버1").email("ee").name("ss").nickname("ss").password("ss").build();
        em.persist(manager);
        em.flush();
        em.clear();

        RoomCreateRequestDto req = RoomCreateRequestDto.builder().
                mangerId("멤버1").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.DISPOSABLE).
                build();
        roomService.createRoom(req);
        room = roomRepository.findByTitle("title");
    }

    @Test
    @Transactional
    void createTest(){
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        Lounge lounge = loungeService.createLounge(req, "멤버1");

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
        Lounge lounge = loungeService.createLounge(req, "멤버1");
        log.info("채널 삭제됨? : {}", lounge.isDeleted());
        lounge = loungeRepository.findAll().get(0);
        log.info("채널 삭제됨?????? : {}", lounge.isDeleted());

        LoungeUpdateRequestDto req2 = new LoungeUpdateRequestDto("lounge2");
        loungeService.updateLounge(req2, lounge.getId(), "멤버1");

        log.info("id : {}", lounge.getId());
        log.info("name : {}", lounge.getName());
        log.info("roomTitle : {}", lounge.getRoom().getTitle());

        assertThat(loungeRepository.findById(lounge.getId()).get().getName()).isEqualTo("lounge2");
    }

    @Test
    @Transactional
    void deleteTest(){
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        loungeService.createLounge(req, "멤버1");
        Lounge lounge = loungeRepository.findAll().get(0);

        assertThat(room.getLounges().size()).isEqualTo(1);
        loungeService.deleteLounge(lounge.getId(), "멤버1");
        assertThat(loungeRepository.findById(lounge.getId()).get().isDeleted()).isTrue();
        assertThat(room.getLounges().size()).isEqualTo(0);
    }

    @Test
    @Transactional
    void roomDeleteTest(){
        Room room = roomRepository.findByTitle("title");
        LoungeCreateRequestDto req = new LoungeCreateRequestDto(room.getId(), "lounge1");
        loungeService.createLounge(req, "멤버1");
        Lounge lounge = loungeRepository.findAll().get(0);

        room.delete();
        assertThat(room.getLounges().size()).isEqualTo(0);
        assertThat(lounge.isDeleted()).isTrue();
    }

}

