

package com.a506.comeet.api.service.room;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomSortBy;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchResponseDto;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Slf4j
public class RoomServiceSeartchTest {

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

    @Test
    @Transactional
    void basicTest(){

        Member manager = Member.builder().memberId("매니저").build();
        em.persist(manager);
        em.flush();
        em.clear();

        // 키워드 생성
        keywordRepository.save(new Keyword("자바"));
        keywordRepository.save(new Keyword("파이썬"));
        keywordRepository.save(new Keyword("자바스크립트"));
        keywordRepository.save(new Keyword("고"));
        keywordRepository.save(new Keyword("레츠고"));

        //방 생성
        for (int i = 1; i <= 50; i++) {
            RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                    mangerId("매니저").
                    title("title"+i).description("설명"+i).capacity(9).constraints(RoomConstraints.FREE).keywordIds(List.of(1L, 2L, 3L)).type(RoomType.PERMANENT).
                    build();
            roomService.createRoom(reqR);
        }

        RoomSearchRequestDto req = RoomSearchRequestDto.builder().
                searchKeyword("title").
                maxCapacity(10).
                minCapacity(4).
                constraints(List.of(RoomConstraints.MICOFF, RoomConstraints.FREE)).
                sortBy(RoomSortBy.capacity).isDesc(true).
                keywordIds(List.of(1L,2L)).
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
