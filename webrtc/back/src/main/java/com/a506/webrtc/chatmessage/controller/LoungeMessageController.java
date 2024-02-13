package com.a506.webrtc.chatmessage.controller;

import com.a506.webrtc.chatmessage.service.LoungeMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/lounge")
public class LoungeMessageController {

    private final LoungeMessageService loungeMessageService;

    @GetMapping("/messages")
    public ResponseEntity<?> getMessages(@RequestParam(name = "loungeId") Long loungeId){
        System.out.println(loungeId);
        return ResponseEntity.ok(loungeMessageService.getMessagesByLoungeId(loungeId));
    }
}