package com.a506.comeet.api.service;

import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.RoomSearchRequestDto;
import com.a506.comeet.room.controller.RoomSearchResponseDto;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.repository.RoomRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
public class RoomServiceSeartchTest {

    @Autowired
    private RoomRepository roomRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    @Rollback(value = false)
    void basicTest(){

        Member member = Member.builder().memberId("testMember").nickname("닉네임").build();
        em.persist(member);

        Room room1 = Room.builder().manager(member).title("방1").capacity(10).build();
        Room room2 = Room.builder().manager(member).title("방1").capacity(1).build();
        Room room3 = Room.builder().manager(member).title("방2").capacity(10).build();
        Room room4 = Room.builder().manager(member).title("바아앙").capacity(10).build();
        em.persist(room1);
        em.persist(room2);
        em.persist(room3);
        em.persist(room4);
        em.flush();
        em.clear();

        RoomSearchRequestDto req = RoomSearchRequestDto.builder().searchKeyword("방").maxCapacity(10).minCapacity(5).build();

        List<RoomSearchResponseDto> list = roomRepository.findRoomCustom(req);
        for (RoomSearchResponseDto roomSearchResponseDto : list) {
            System.out.println("roomId = " + roomSearchResponseDto.getRoomId());
            System.out.println("managerNickname = " + roomSearchResponseDto.getManagerNickname());
            System.out.println("title = " + roomSearchResponseDto.getTitle());
            System.out.println("capacity = " + roomSearchResponseDto.getCapacity());
            System.out.println("type = " + roomSearchResponseDto.getType());
        }
        Assertions.assertThat(list.size()).isEqualTo(2);
    }
}
