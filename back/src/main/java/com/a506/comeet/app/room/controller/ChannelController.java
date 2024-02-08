package com.a506.comeet.app.room.controller;

import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.room.controller.dto.ChannelCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.ChannelUpdateRequestDto;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.service.ChannelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping("")
    public ResponseEntity<Long> create(@Valid @RequestBody ChannelCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Channel created = channelService.create(req, memberId);
        return ResponseEntity.ok(created.getId());
    }

    @PatchMapping("{channelId}")
    public ResponseEntity<Void> update(@Valid @RequestBody ChannelUpdateRequestDto req, @PathVariable Long channelId){
        String memberId = MemberUtil.getMemberId();
        channelService.update(req, channelId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity<Void> delete(@PathVariable Long channelId){
        String memberId = MemberUtil.getMemberId();
        channelService.delete(channelId, memberId);
        return ResponseEntity.ok().build();
    }

}
