package com.a506.webrtc.chatmessage.repository;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRespository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByTypeAndNum(Type type, Long num);
}
