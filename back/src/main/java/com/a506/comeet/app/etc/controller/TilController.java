package com.a506.comeet.app.etc.controller;

import com.a506.comeet.Util.MemberUtil;
import com.a506.comeet.app.etc.controller.dto.TilListResponseDto;
import com.a506.comeet.app.etc.controller.dto.TilRequestDto;
import com.a506.comeet.app.etc.controller.dto.TilResponseDto;
import com.a506.comeet.app.etc.controller.dto.TilSearchRequestDto;
import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.etc.service.TilService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/til")
@RequiredArgsConstructor
public class TilController {

    private final TilService tilService;

    @PostMapping("")
    public ResponseEntity create(@RequestBody @Valid TilRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Til created = tilService.create(req, memberId);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @PatchMapping("/{tilId}")
    public ResponseEntity<Void> update(@Valid @RequestBody TilRequestDto req, Long tilId){
        String memberId = MemberUtil.getMemberId();
        tilService.update(req, tilId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{tilId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long tilId){
        String memberId = MemberUtil.getMemberId();
        tilService.delete(tilId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{tilId}")
    public ResponseEntity<TilResponseDto> get(@PathVariable long tilId){
        return new ResponseEntity<>(tilService.find(tilId), HttpStatus.OK);
    }

    @GetMapping("/list/{memberId}")
    public ResponseEntity<TilListResponseDto> getList(@Valid @RequestBody TilSearchRequestDto req, @PathVariable String memberId){
        return new ResponseEntity<>(tilService.findList(req, memberId), HttpStatus.OK);
    }
}
