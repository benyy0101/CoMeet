package com.a506.webrtc.chatmessage.controller;

import com.a506.webrtc.chatmessage.Type;
import com.a506.webrtc.chatmessage.entity.ChatMessage;
import com.a506.webrtc.chatmessage.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @GetMapping("/messages")
    public ResponseEntity<?> getMessage(@RequestParam(name = "type") Type type, @RequestParam(name = "num") Long num){
        System.out.println(type);
        System.out.println(num);
        return ResponseEntity.ok(chatMessageService.getMessagesByTypeAndNum(type, num));
    }

    @GetMapping("/message")
    public String create(@RequestParam(name = "num") Long num){
        System.out.println(num);
        System.out.println("aaa");
        return "aaa";
    }
}