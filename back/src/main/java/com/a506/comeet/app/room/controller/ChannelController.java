package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.member.MemberUtil;
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
        String memberId = MemberUtil.getMemberId();
        Channel created = channelService.createChannel(requestDto, memberId);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @PatchMapping("{channelId}")
    public ResponseEntity update(@Valid @RequestBody ChannelUpdateRequestDto requestDto, @PathVariable Long channelId){
        String memberId = MemberUtil.getMemberId();
        channelService.updateChannel(requestDto, channelId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{channelId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long channelId){
        String memberId = MemberUtil.getMemberId();
        channelService.deleteChannel(channelId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
