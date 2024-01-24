package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.ChannelUpdateRequestDto;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.service.ChannelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping("")
    public ResponseEntity create(@Valid @RequestBody ChannelCreateRequestDto requestDto){
        // 요청자 정보 가져오기
        Channel created = channelService.createChannel(requestDto);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @PatchMapping("{channelId}")
    public ResponseEntity update(@Valid @RequestBody ChannelUpdateRequestDto requestDto, @PathVariable Long channelId){
        // 요청자 정보 가져오기
        channelService.updateChannel(requestDto, channelId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{channelId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long channelId){
        // 요청자 정보 가져오기
        channelService.deleteChannel(channelId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
