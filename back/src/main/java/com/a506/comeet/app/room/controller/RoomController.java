package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody RoomCreateRequestDto req) {
        // 요청자 정보 가져오기
        req.setMangerId("요청자_임시매니저"); // 요청자 정보를 manager로 설정
        Room created = roomService.createRoom(req);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @PatchMapping("{roomId}")
    public ResponseEntity<Void> update(@Valid @RequestBody RoomUpdateRequestDto req, @PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        roomService.updateRoom(req, reqMemberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{roomId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        roomService.deleteRoom(reqMemberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("{roomId}/join")
    public ResponseEntity<Void> join(@Valid @RequestBody RoomJoinRequestDto req, @PathVariable long roomId){
        // 요청자 정보
        String memberId = "방장";
        roomService.joinMember(req, memberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}/exit")
    public ResponseEntity<Void> leave(@PathVariable long roomId){
        // 요청자 정보 가져오기
        String reqMemberId = "요청자";
        roomService.leaveRoom(reqMemberId, roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("")
    public ResponseEntity<Slice<RoomSearchResponseDto>> search(@Valid RoomSearchRequestDto req){
        Slice<RoomSearchResponseDto> res = roomService.searchRoom(req);
        return new ResponseEntity<Slice<RoomSearchResponseDto>>(res, HttpStatus.OK);
    }


    // 수정 필요합니다
    @GetMapping("/{roomId}")
    public ResponseEntity<?> enter(@PathVariable Long roomId){
        // 현재 유저 정보 가져오기
        String memberId = "멤버아이디";
        RoomResponseDto res = roomService.enterRoom(roomId, memberId);
        return new ResponseEntity<RoomResponseDto>(res, HttpStatus.OK);
    }


}
