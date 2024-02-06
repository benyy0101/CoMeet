

package com.a506.comeet.app.room;

import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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

        Member manager = Member.builder().memberId("매니저").email("ee").name("ss").nickname("ss").password("ss").build();
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
                    managerId("매니저").
                    title("title"+i).description("설명"+i).capacity(9).constraints(RoomConstraints.FREE).keywordIds(List.of(1L, 2L, 3L)).type(RoomType.PERMANENT).
                    build();
            roomService.create(reqR);
        }

//        RoomSearchRequestDto req = RoomSearchRequestDto.builder().
//                searchKeyword("title").
//                constraints(List.of(RoomConstraints.MICOFF, RoomConstraints.FREE)).
//                sortBy(RoomSortBy.capacity).isDesc(true).
//                keywordIds(List.of(1L,2L)).
//                pageNo(0).pageSize(20).
//                build();
//
//        Slice<RoomSearchResponseDto> list = roomRepository.searchRoomCustom(req, PageRequest.of(req.getPageNo(), req.getPageSize()));
//        for (RoomSearchResponseDto roomSearchResponseDto : list) {
//            log.info("roomId = {}",roomSearchResponseDto.getRoomId());
//            log.info("managerNickname = {}",roomSearchResponseDto.getManagerNickname());
//            log.info("title = {}",roomSearchResponseDto.getTitle());
//            log.info("capacity = {}",roomSearchResponseDto.getCapacity());
//            log.info("type = {}",roomSearchResponseDto.getType());
//        }
//        Assertions.assertThat(list.getContent().size()).isEqualTo(20);
    }

    // 정렬 조건이 pk가 아니라서 no offset을 사용할 수 없다
//    @Test
//    @Transactional
//    void roomSearchVs(){
//        Long srt = System.currentTimeMillis();
//        RoomSearchRequestDto req = RoomSearchRequestDto.builder().
//                searchKeyword("title").
//                maxCapacity(1000).
//                minCapacity(4).
//                pageNo(99).pageSize(10).sortBy(RoomSortBy.capacity).isDesc(false).
//                build();
//        Slice<RoomSearchResponseDto> legacy = roomRepository.searchRoomCustom(req, PageRequest.of(req.getPageNo(), req.getPageSize()));
//        log.info("legacy : {}",System.currentTimeMillis() - srt);
//        assertThat(legacy.getContent().size()).isEqualTo(10);
//        log.info("{}", legacy.getContent().get(0).getRoomId());
//
//        Long srt2 = System.currentTimeMillis();
//        RoomSearchRequestDto req2 = RoomSearchRequestDto.builder().
//                searchKeyword("title").
//                maxCapacity(1000).
//                minCapacity(4).
//                pageNo(0).pageSize(10).
//                prevRoomId(990L).
//                build();
//        Slice<RoomSearchResponseDto> noOffset = roomRepository.searchRoomCustom(req2, PageRequest.of(req2.getPageNo(), req2.getPageSize()));
//        log.info("noOffset : {}",System.currentTimeMillis() - srt2);
//        assertThat(noOffset.getContent().size()).isEqualTo(10);
//        log.info("{}", noOffset.getContent().get(0).getRoomId());
//    }
}
