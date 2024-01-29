package com.a506.webrtc.chatmessage.controller;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @GetMapping("/messages")
    public ResponseEntity<?> getMessage(@RequestParam(name = "type") Type type, @RequestParam(name = "chatId") Long chatId){
        System.out.println(type);
        System.out.println(chatId);
        return ResponseEntity.ok(chatMessageService.getMessagesByTypeAndNum(type, chatId));
    }
}