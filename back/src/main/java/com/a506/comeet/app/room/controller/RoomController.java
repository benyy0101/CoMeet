package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.member.MemberUtil;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@Slf4j
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
    public ResponseEntity<Void> withdraw(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.withdraw(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("")
    public ResponseEntity<Slice<RoomSearchResponseDto>> search(@Valid RoomSearchRequestDto req, @PageableDefault(size = 20) Pageable pageable) {
        Slice<RoomSearchResponseDto> res = roomService.search(req, pageable);
        return ResponseEntity.ok(res);
    }

    // 수정 필요합니다
    @PostMapping("/{roomId}/enter")
    public ResponseEntity<RoomResponseDto> enter(@RequestBody RoomEnterRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        RoomResponseDto res = roomService.enter(req, roomId, memberId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{roomId}/enter")
    public ResponseEntity<Void> leave(@RequestBody RoomLeaveRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        String metadataId = roomService.leave(req, roomId, memberId);
        log.info("메타데이터 생성 : {}",metadataId);
        return ResponseEntity.ok().build();
    }


}
