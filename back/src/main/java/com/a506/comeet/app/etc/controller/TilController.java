package com.a506.comeet.app.etc.controller;

import com.a506.comeet.app.etc.controller.dto.*;
import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.etc.service.TilService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/til")
@RequiredArgsConstructor
@Slf4j
public class TilController {

    private final TilService tilService;

    @PostMapping("")
    public ResponseEntity<Long> create(@RequestBody @Valid TilCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Til created = tilService.create(req, memberId);
        return ResponseEntity.ok(created.getId());
    }

    @PatchMapping("/{tilId}")
    public ResponseEntity<Void> update(@Valid @RequestBody TilUpdateRequestDto req, @PathVariable Long tilId){
        String memberId = MemberUtil.getMemberId();
        tilService.update(req, tilId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{tilId}")
    public ResponseEntity<Void> delete(@PathVariable Long tilId){
        String memberId = MemberUtil.getMemberId();
        tilService.delete(tilId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{tilId}")
    public ResponseEntity<TilResponseDto> get(@PathVariable Long tilId){
        return ResponseEntity.ok(tilService.find(tilId));
    }

    @GetMapping("/list/{memberId}")
    public ResponseEntity<TilListResponseDto> getList(@Valid TilSearchRequestDto req, @PathVariable String memberId){
        return ResponseEntity.ok(tilService.findList(req, memberId));
    }
}
