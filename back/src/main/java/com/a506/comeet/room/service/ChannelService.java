package com.a506.comeet.room.service;

import com.a506.comeet.room.controller.ChannelCreateRequestDto;
import com.a506.comeet.room.controller.ChannelUpdateRequestDto;
import com.a506.comeet.room.entity.Channel;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.repository.ChannelRepository;
import com.a506.comeet.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ChannelService {

    private final ChannelRepository channelRepository;

    private final RoomRepository roomRepository;


    @Transactional
    public Channel createChannel(ChannelCreateRequestDto req) {
        // 사용자가 방장인지 확인하는 로직 필요

        Room room = roomRepository.findByIdAndIsDeletedFalse(req.getRoomId()).get();
        // 이름 중복 확인 로직
        for(Channel c : room.getChannels()){
            if (c.getName().equals(req.getName())) return null;
        }

        Channel channel = Channel.builder().name(req.getName()).room(room).build();
        room.addChannel(channel);
        return channelRepository.save(channel);
    }


    @Transactional
    public boolean updateChannel(ChannelUpdateRequestDto req, Long channelId) {
        // 사용자가 방장인지 확인하는 로직 필요

        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new RuntimeException("Channel not found with id: " + channelId));
        // 이름 중복 확인 로직
        for(Channel c : channel.getRoom().getChannels()){
            if (c.getName().equals(req.getName())) return false;
        }
        channel.update(req);
        channelRepository.save(channel);
        return true;
    }

    @Transactional
    public boolean deleteChannel(long channelId) {
        // 사용자가 방장인지 확인하는 로직 필요
        Channel channel = channelRepository.findByIdAndIsDeletedFalse(channelId).orElseThrow(() -> new RuntimeException("Channel not found with id: " + channelId));
        channel.delete();
        return true;
    }
}
