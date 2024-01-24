package com.a506.webrtc.chatmessage.entity;

import com.a506.webrtc.chatmessage.Type;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Builder
@Document(collection = "chatMessage")
public class ChatMessage {
    @Id
    private String id;
    private Type type;  //채널 or 라운지
    private Long num;   //채널 아이디 or 라운지 아이디
    private String memberId;
    private String nickname;
    private String message;
    private String imageUrl;
    private String createdAt;
}