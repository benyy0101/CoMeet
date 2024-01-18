

package com.a506.comeet.api.service.room;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomSortBy;
import com.a506.comeet.common.enums.RoomType;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Slf4j
public class RoomServiceSeartchTest {

    @Autowired
    private RoomRepository roomRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    @Transactional
    void basicTest(){

        Member member = Member.builder().memberId("testMember").nickname("닉네임").build();
        em.persist(member);
        for (int t = 0; t < 4; t++) {
            for (int i = 0; i < 100; i++) {
                Room room = Room.builder().manager(member).title("방"+i).capacity(t * 4).type(RoomType.DISPOSABLE).constraints(RoomConstraints.FREE).build();
                em.persist(room);
            }
        }
        for (int i = 0; i < 100; i++) {
            Room room = Room.builder().manager(member).title("test방"+i).capacity(10).type(RoomType.DISPOSABLE).constraints(RoomConstraints.MICOFF).build();
            em.persist(room);
        }
        em.flush();
        em.clear();

        RoomSearchRequestDto req = RoomSearchRequestDto.builder().
                searchKeyword("방").
                maxCapacity(10).
                minCapacity(4).
                constraints(List.of(RoomConstraints.MICOFF, RoomConstraints.FREE)).
                sortBy(RoomSortBy.capacity).isDesc(true).
                pageNo(0).pageSize(50).
                build();

        Slice<RoomSearchResponseDto> list = roomRepository.findRoomCustom(req, PageRequest.of(req.getPageNo(), req.getPageSize()));
        for (RoomSearchResponseDto roomSearchResponseDto : list) {
            log.info("roomId = {}",roomSearchResponseDto.getRoomId());
            log.info("managerNickname = {}",roomSearchResponseDto.getManagerNickname());
            log.info("title = {}",roomSearchResponseDto.getTitle());
            log.info("capacity = {}",roomSearchResponseDto.getCapacity());
            log.info("type = {}",roomSearchResponseDto.getType());
        }
        Assertions.assertThat(list.getContent().size()).isEqualTo(50);
    }
}
