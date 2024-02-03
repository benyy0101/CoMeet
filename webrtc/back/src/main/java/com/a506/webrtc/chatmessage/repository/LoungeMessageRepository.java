package com.a506.webrtc.chatmessage.repository;

import com.a506.webrtc.chatmessage.entity.LoungeMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LoungeMessageRepository extends MongoRepository<LoungeMessage, String> {
    List<LoungeMessage> findByLoungeId(Long loungeId);
}
