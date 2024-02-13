package com.a506.comeet.app.room.controller;

import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.service.LoungeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lounge")
@RequiredArgsConstructor
public class LoungeController {

    private final LoungeService loungeService;


    @PostMapping("")
    public ResponseEntity<Long> create(@Valid @RequestBody LoungeCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Lounge created = loungeService.create(req, memberId);
        return ResponseEntity.ok(created.getId());
    }


    @PatchMapping("{loungeId}")
    public ResponseEntity<Void> update(@Valid @RequestBody LoungeUpdateRequestDto req, @PathVariable Long loungeId){
        String memberId = MemberUtil.getMemberId();
        loungeService.update(req, loungeId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{loungeId}")
    public ResponseEntity<Void> delete(@PathVariable Long loungeId){
        String memberId = MemberUtil.getMemberId();
        loungeService.delete(loungeId, memberId);
        return ResponseEntity.ok().build();
    }

}
