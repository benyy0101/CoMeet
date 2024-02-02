package com.a506.webrtc.chatmessage.controller;

import com.a506.webrtc.chatmessage.service.ChannelMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/channel")
public class ChannelMessageController {

    private final ChannelMessageService chatMessageService;

    @GetMapping("/messages")
    public ResponseEntity<?> getMessage(@RequestParam(name = "channelId") Long channelId){
        System.out.println(channelId);
        return ResponseEntity.ok(chatMessageService.getMessagesByChannelId(channelId));
    }
}