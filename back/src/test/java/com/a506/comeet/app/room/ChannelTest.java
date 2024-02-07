package com.a506.comeet.app.room;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.ChannelUpdateRequestDto;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.ChannelRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.ChannelService;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
public class ChannelTest {

    @Autowired
    private ChannelService channelService;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChannelRepository channelRepository;

    private Member manager;

    private Room room;

    @Test
    @Transactional
    void createTest(){
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        Channel channel = channelService.create(req, "멤버1");

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
        Channel channel = channelService.create(req, "멤버1");
        channel = channelRepository.findAll().get(0);

        ChannelUpdateRequestDto req2 = new ChannelUpdateRequestDto("channel2");
        channelService.update(req2, channel.getId(), "멤버1");

        log.info("id : {}", channel.getId());
        log.info("name : {}", channel.getName());
        log.info("roomTitle : {}", channel.getRoom().getTitle());

        assertThat(channelRepository.findById(channel.getId()).get().getName()).isEqualTo("channel2");
    }

    @Test
    @Transactional
    void deleteTest(){
        ChannelCreateRequestDto req = new ChannelCreateRequestDto(room.getId(), "channel1");
        channelService.create(req, "멤버1");
        Channel channel = channelRepository.findAll().get(0);

        assertThat(room.getChannels().size()).isEqualTo(1);
        channelService.delete(channel.getId(), "멤버1");
        assertThat(room.getChannels().size()).isEqualTo(0);
    }
}
