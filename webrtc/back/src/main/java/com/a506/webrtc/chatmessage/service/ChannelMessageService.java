package com.a506.webrtc.chatmessage.service;

import com.a506.webrtc.chatmessage.entity.ChannelMessage;
import com.a506.webrtc.chatmessage.repository.ChannelMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChannelMessageService {

    private final ChannelMessageRepository channelMessageRepository;

    public void create(Map<String, Object> data) {
        ChannelMessage chatMessage = ChannelMessage.builder()
                .channelId(Long.parseLong(data.get("channelId").toString()))
                .memberId((String) data.get("memberId"))
                .nickname((String) data.get("nickname"))
                .message((String) data.get("message"))
                .imageUrl((String) data.get("imageUrl"))
                .createdAt((String) data.get("createdAt"))
                .build();

        channelMessageRepository.save(chatMessage);
    }

    public List<ChannelMessage> getMessagesByChannelId(Long channelId) {
        return channelMessageRepository.findByChannelId(channelId);
    }
}
