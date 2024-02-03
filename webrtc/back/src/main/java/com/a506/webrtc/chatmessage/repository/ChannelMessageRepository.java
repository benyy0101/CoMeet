package com.a506.webrtc.chatmessage.repository;

import com.a506.webrtc.chatmessage.entity.ChannelMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChannelMessageRepository extends MongoRepository<ChannelMessage, String> {
    List<ChannelMessage> findByChannelId(Long channelId);
}
