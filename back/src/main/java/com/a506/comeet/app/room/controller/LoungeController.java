package com.a506.comeet.app.room.controller;

import com.a506.comeet.Util.MemberUtil;
import com.a506.comeet.app.room.controller.dto.LoungeCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.service.LoungeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lounge")
@RequiredArgsConstructor
public class LoungeController {

    private final LoungeService loungeService;


    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody LoungeCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Lounge created = loungeService.createLounge(req, memberId);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }


    @PatchMapping("{loungeId}")
    public ResponseEntity<?> update(@Valid @RequestBody LoungeUpdateRequestDto req, @PathVariable Long loungeId){
        String memberId = MemberUtil.getMemberId();
        loungeService.updateLounge(req, loungeId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{loungeId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long loungeId){
        String memberId = MemberUtil.getMemberId();
        loungeService.deleteLounge(loungeId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
