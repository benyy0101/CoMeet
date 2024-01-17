package com.a506.comeet.room.controller;

import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("")
    public ResponseEntity<?> createRoom(@RequestBody RoomCreateRequestDto requestDto) {
        requestDto.setMangerId("임시매니저"); // MemberId를 임시로 세팅해줌
        Room created = roomService.createRoom(requestDto);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @PatchMapping("{roomId}")
    public ResponseEntity<Void> updateRoom(@RequestBody RoomUpdateRequestDto requestDto, @PathVariable long roomId){
        roomService.updateRoom(requestDto, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{roomId}/delete")
    public ResponseEntity<Void> deleteRoom(@PathVariable long roomId){
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("{roomId}/join")
//    public ResponseEntity<Void> joinMember(@RequestBody RoomJoinRequestDto requestDto, @PathVariable long roomId){
//        roomService.joinMember(requestDto, roomId);
//    }

}
