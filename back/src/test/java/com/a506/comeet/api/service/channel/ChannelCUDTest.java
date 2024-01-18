package com.a506.comeet.api.service.channel;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.ChannelCreateRequestDto;
import com.a506.comeet.room.controller.ChannelUpdateRequestDto;
import com.a506.comeet.room.controller.RoomCreateRequestDto;
import com.a506.comeet.room.entity.Channel;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.repository.ChannelRepository;
import com.a506.comeet.room.repository.RoomRepository;
import com.a506.comeet.room.service.ChannelService;
import com.a506.comeet.room.service.RoomService;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
public class ChannelCUDTest {

    @Autowired
    private ChannelService channelService;

    @Autowired
    private EntityManager em;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChannelRepository channelRepository;

    private Member manager;

    private Room room;

    @BeforeEach
    public void init(){
        manager = Member.builder().memberId("멤버1").build();
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
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        Channel channel = channelService.createChannel(req);

        for (Channel c : channelRepository.findAll()) {
            log.info("id : {}", channel.getId());
            log.info("name : {}", channel.getName());
            log.info("roomTitle : {}", channel.getRoom().getTitle());
        }
        assertThat(channelRepository.findAll().get(0).getName()).isEqualTo("channel1");
    }

    @Test
    @Transactional
    void updateTest(){
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        Channel channel = channelService.createChannel(req);
        log.info("채널 삭제됨? : {}", channel.isDeleted());
        channel = channelRepository.findAll().get(0);
        log.info("채널 삭제됨?????? : {}", channel.isDeleted());

        ChannelUpdateRequestDto req2 = new ChannelUpdateRequestDto("channel2");
        channelService.updateChannel(req2, channel.getId());

        log.info("id : {}", channel.getId());
        log.info("name : {}", channel.getName());
        log.info("roomTitle : {}", channel.getRoom().getTitle());

        assertThat(channelRepository.findById(channel.getId()).get().getName()).isEqualTo("channel2");
    }

    @Test
    @Transactional
    void deleteTest(){
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        Channel channel = channelService.createChannel(req);
        channel = channelRepository.findAll().get(0);

        assertThat(room.getChannels().size()).isEqualTo(1);
        channelService.deleteChannel(channel.getId());
        assertThat(channelRepository.findById(channel.getId()).get().isDeleted()).isTrue();
        assertThat(room.getChannels().size()).isEqualTo(0);
    }

    @Test
    @Transactional
    void roomDeleteTest(){
        Room room = roomRepository.findByTitle("title");
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        Channel channel = channelService.createChannel(req);
        channel = channelRepository.findAll().get(0);

        room.delete();
        assertThat(room.getChannels().size()).isEqualTo(0);
        assertThat(channel.isDeleted()).isTrue();
    }

}
