package com.a506.webrtc.chatmessage.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document(collection = "channelMessage")
public class ChannelMessage {
    @Id
    private String id;
    private Long channelId;
    private String memberId;
    private String nickname;
    private String message;
    private String imageUrl;
    private String createdAt;
}