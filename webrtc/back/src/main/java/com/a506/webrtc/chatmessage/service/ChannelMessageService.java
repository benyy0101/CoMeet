package com.a506.webrtc.chatmessage.service;

import com.a506.webrtc.chatmessage.entity.ChannelMessage;
import com.a506.webrtc.chatmessage.repository.ChannelMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChannelMessageService {

    private final ChannelMessageRepository channelMessageRepository;

    public void create(ChannelMessage channelMessage) {
        channelMessageRepository.save(channelMessage);
    }

    public List<ChannelMessage> getMessagesByChannelId(Long channelId) {
        return channelMessageRepository.findByChannelId(channelId);
    }
}
