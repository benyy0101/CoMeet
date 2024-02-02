package com.a506.webrtc.stomp.controller;

import com.a506.webrtc.chatmessage.service.ChannelMessageService;
import com.a506.webrtc.chatmessage.service.LoungeMessageService;
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
    private final ChannelMessageService chatMessageService;
    private final LoungeMessageService loungeMessageService;

    @MessageMapping("/chat/channel/send")
    @SendTo
    public void sendChannelMsg(@Payload Map<String, Object> data){
        System.out.println(data);
        chatMessageService.create(data);
        simpMessagingTemplate.convertAndSend("/chat/channel/" + data.get("channelId"), data);
    }

    @MessageMapping("/chat/lounge/send")
    @SendTo
    public void sendLoungeMsg(@Payload Map<String, Object> data){
        loungeMessageService.create(data);
        simpMessagingTemplate.convertAndSend("/chat/lounge/" + data.get("loungeId"), data);
    }
}
