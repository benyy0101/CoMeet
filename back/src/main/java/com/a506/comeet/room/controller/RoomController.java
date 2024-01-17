package com.a506.comeet.room.controller;

import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PostMapping("")
    public ResponseEntity<?> createRoom(@Valid @RequestBody RoomCreateRequestDto requestDto) {
        // 요청자 정보 가져오기
        requestDto.setMangerId("요청자_임시매니저"); // 요청자 정보를 manager로 설정
        Room created = roomService.createRoom(requestDto);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PatchMapping("{roomId}")
    public ResponseEntity<Void> updateRoom(@Valid @RequestBody RoomUpdateRequestDto requestDto, @PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        if (!roomService.updateRoom(requestDto, reqMemberId, roomId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{roomId}/delete")
    public ResponseEntity<Void> deleteRoom(@PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        roomService.deleteRoom(reqMemberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PostMapping("{roomId}/join")
    public ResponseEntity<Void> joinMember(@Valid @RequestBody RoomJoinRequestDto requestDto, @PathVariable long roomId){
        // 요청자 정보
        String memberId = "방장";
        if(!roomService.joinMember(requestDto, memberId, roomId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}/exit")
    public ResponseEntity<Void> leaveRoom(@PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        roomService.leaveRoom(reqMemberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
