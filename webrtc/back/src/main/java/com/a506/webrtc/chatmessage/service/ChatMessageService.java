package com.a506.webrtc.chatmessage.service;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.entity.ChatMessage;
import com.a506.webrtc.chatmessage.repository.ChatMessageRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRespository chatMessageRespository;

    public void create(Map<String, Object> data) {

        ChatMessage chatMessage = ChatMessage.builder()
                .type(Type.valueOf((String) data.get("type")))
                .num(Long.parseLong((String) data.get("num")))
                .memberId((String) data.get("memberId"))
                .nickname((String) data.get("nickname"))
                .message((String) data.get("message"))
                .imageUrl((String) data.get("imageUrl"))
                .createdAt((String) data.get("24.01.24"))
                .build();

        chatMessageRespository.save(chatMessage);
    }
}
