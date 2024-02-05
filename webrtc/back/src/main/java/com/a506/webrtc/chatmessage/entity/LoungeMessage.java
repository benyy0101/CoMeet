package com.a506.webrtc.chatmessage.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "loungeMessage")
public class LoungeMessage {
    @Id
    private String id;
    private Long loungeId;
    private String memberId;
    private String profileImage;
    private String nickname;
    private String message;
    private String imageUrl;
    private String createdAt;
}