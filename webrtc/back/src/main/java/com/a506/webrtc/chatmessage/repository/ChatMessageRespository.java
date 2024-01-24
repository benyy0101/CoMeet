package com.a506.webrtc.chatmessage.repository;

import com.a506.webrtc.chatmessage.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatMessageRespository extends MongoRepository<ChatMessage, String> {

}
