package com.a506.comeet.room.controller;

import com.a506.comeet.room.entity.Channel;
import com.a506.comeet.room.service.ChannelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PostMapping("")
    public ResponseEntity create(@Valid @RequestBody ChannelCreateRequestDto requestDto){
        // 요청자 정보 가져오기
        Channel created = channelService.createChannel(requestDto);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PatchMapping("{channelId}")
    public ResponseEntity update(@Valid @RequestBody ChannelUpdateRequestDto requestDto, @PathVariable Long channelId){
        // 요청자 정보 가져오기
        if (!channelService.updateChannel(requestDto, channelId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{channelId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long channelId){
        // 요청자 정보 가져오기
        if(!channelService.deleteChannel(channelId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
