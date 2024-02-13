package com.a506.webrtc.stomp.controller;

import com.a506.webrtc.chatmessage.entity.ChannelMessage;
import com.a506.webrtc.chatmessage.entity.LoungeMessage;
import com.a506.webrtc.chatmessage.service.ChannelMessageService;
import com.a506.webrtc.chatmessage.service.LoungeMessageService;
import com.a506.webrtc.stomp.entity.Event;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChannelMessageService chatMessageService;
    private final LoungeMessageService loungeMessageService;

    @MessageMapping("/chat/channel/send")
    @SendTo
    public void sendChannelMsg(ChannelMessage channelMessage) {
        System.out.println(channelMessage.getMessage());
        chatMessageService.create(channelMessage);
        simpMessagingTemplate.convertAndSend("/chat/channel/" + channelMessage.getChannelId(), channelMessage);
    }

    @MessageMapping("/chat/lounge/send")
    @SendTo
    public void sendLoungeMsg(LoungeMessage loungeMessage) {
        loungeMessageService.create(loungeMessage);
        simpMessagingTemplate.convertAndSend("/chat/lounge/" + loungeMessage.getLoungeId(), loungeMessage);
    }

    @MessageMapping("/room/info/send")
    @SendTo
    public void sendRoomInfo(Event event) {
        simpMessagingTemplate.convertAndSend("/room/info/" + event.getRoomId(), event);
    }
}