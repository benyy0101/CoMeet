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
        // 사용자가 방장인지 확인
        managerAuthorization(memberId, room);

        // 이름 중복 확인 로직
        for(Channel c : room.getChannels()){
            if (c.getName().equals(req.getName())) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "방 내의 채널 이름이 중복됩니다");
        }

        Channel channel = channelRepository.save(Channel.builder().name(req.getName()).room(room).build());
        room.addChannel(channel);
        return channel;
    }


    @Transactional
    public void update(ChannelUpdateRequestDto req, Long channelId, String memberId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_CHANNEL));
        Room room = channel.getRoom();
        // 사용자가 방장인지 확인
        managerAuthorization(memberId, room);

        // 이름 중복 확인 로직
        for(Channel c : room.getChannels()){
            if (c.getName().equals(req.getName())) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "방 내의 채널 이름이 중복됩니다");
        }
        channel.update(req);
        channelRepository.save(channel);
    }

    @Transactional
    public void delete(Long channelId, String memberId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_CHANNEL));
        // 사용자가 방장인지 확인
        managerAuthorization(memberId, channel.getRoom());
        // 방에는 최소 1개의 채널이 남아있어야 함
        atLeastOneChannelValitadion(channel.getRoom());
        channel.delete();
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
