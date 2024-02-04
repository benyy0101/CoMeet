package com.a506.webrtc.chatmessage.service;

import com.a506.webrtc.chatmessage.entity.LoungeMessage;
import com.a506.webrtc.chatmessage.repository.LoungeMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoungeMessageService {

    private final LoungeMessageRepository loungeMessageRepository;

    public void create(LoungeMessage loungeMessage) {
        loungeMessageRepository.save(loungeMessage);
    }

    public List<LoungeMessage> getMessagesByLoungeId(Long loungeId) {
        return loungeMessageRepository.findByLoungeId(loungeId);
    }
}
