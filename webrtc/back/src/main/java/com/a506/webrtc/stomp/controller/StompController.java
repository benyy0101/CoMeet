package com.a506.webrtc.stomp.controller;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class StompController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/send")
    @SendTo
    public void sendMsg(@Payload Map<String, Object> data){
        System.out.println(data);

        chatMessageService.create(data);

        if(Type.CHANNEL.equals(Type.valueOf((String)data.get("type")))){
            simpMessagingTemplate.convertAndSend("/topic/channel/" + data.get("num"), data);
        } else{
            simpMessagingTemplate.convertAndSend("/topic/lounge/" + data.get("num"), data);
        }
    }
}
