package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.member.MemberUtil;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomSortBy;
import com.a506.comeet.common.enums.RoomType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("")
    public ResponseEntity<Long> create(@Valid @RequestBody RoomCreateRequestDto req) {
        String memberId = MemberUtil.getMemberId();
        req.setMangerId(memberId);
        Room created = roomService.create(req);
        return ResponseEntity.ok(created.getId());
    }


    @PatchMapping("{roomId}")
    public ResponseEntity<Void> update(@Valid @RequestBody RoomUpdateRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.update(req, memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> delete(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.delete(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/join/{roomId}")
    public ResponseEntity<Void> join(@Valid @RequestBody RoomJoinRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.join(req, memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/join/{roomId}")
    public ResponseEntity<Void> leave(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.leave(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("")
    public ResponseEntity<Slice<RoomSearchResponseDto>> search(@Valid RoomSearchRequestDto req) {
        Slice<RoomSearchResponseDto> res = roomService.search(req);
        return ResponseEntity.ok(res);
    }

    // 수정 필요합니다
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponseDto> enter(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        RoomResponseDto res = roomService.enter(roomId, memberId);
        return ResponseEntity.ok(res);
    }


}
