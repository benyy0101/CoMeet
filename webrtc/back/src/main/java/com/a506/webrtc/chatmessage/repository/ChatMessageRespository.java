package com.a506.webrtc.chatmessage.repository;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRespository extends MongoRepository<ChatMessage, String> {
<<<<<<< Updated upstream
    List<ChatMessage> findByTypeAndChatId(Type type, Long chatId);
=======
    List<ChatMessage> findByNum(Long num);
    List<ChatMessage> findByTypeAndNum(Type type, Long num);
>>>>>>> Stashed changes
}
