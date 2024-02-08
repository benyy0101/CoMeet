package com.a506.comeet.app.room.service;

import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.ChannelUpdateRequestDto;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.ChannelRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
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
    public Channel create(ChannelCreateRequestDto req, String memberId) {
        Room room = roomRepository.findById(req.getRoomId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));

        managerAuthorization(memberId, room);
        channelNameValidation(room, req.getName());

        Channel channel = channelRepository.save(Channel.builder().name(req.getName()).room(room).build());
        room.addChannel(channel);
        return channel;
    }


    @Transactional
    public void update(ChannelUpdateRequestDto req, Long channelId, String memberId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_CHANNEL));

        managerAuthorization(memberId, channel.getRoom());
        channelNameValidation(channel.getRoom(), req.getName());

        channel.update(req);
        channelRepository.save(channel);
    }

    @Transactional
    public void delete(Long channelId, String memberId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_CHANNEL));

        managerAuthorization(memberId, channel.getRoom());
        atLeastOneChannelValitadion(channel.getRoom());

        channel.delete();
    }

    private static void channelNameValidation(Room room, String name) {
        for (Channel c : room.getChannels()) {
            if (c.getName().equals(name)) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "방 내의 채널 이름이 중복됩니다");
        }
    }

    private void atLeastOneChannelValitadion(Room room) {
        if (channelRepository.countByRoom(room) <= 1)
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "최소 1개의 채널가 필요합니다");
    }

    private void managerAuthorization(String memberId, Room room){
        if (!memberId.equals(room.getManager().getMemberId()))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "방장이 아닙니다");
    }
}
