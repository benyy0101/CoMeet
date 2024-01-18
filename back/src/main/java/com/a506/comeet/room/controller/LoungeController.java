package com.a506.comeet.room.controller;

import com.a506.comeet.room.entity.Channel;
import com.a506.comeet.room.entity.Lounge;
import com.a506.comeet.room.service.LoungeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lounge")
@RequiredArgsConstructor
public class LoungeController {

    private final LoungeService loungeService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PostMapping("")
    public ResponseEntity create(@Valid @RequestBody LoungeCreateRequestDto req){
        // 요청자 정보 가져오기
        Lounge created = loungeService.createLounge(req);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Long>(created.getId(), HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PatchMapping("{loungeId}")
    public ResponseEntity update(@Valid @RequestBody LoungeUpdateRequestDto req, @PathVariable Long loungeId){
        // 요청자 정보 가져오기
        if (!loungeService.updateLounge(req, loungeId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{loungeId}/delete")
    public ResponseEntity<Void> delete(@PathVariable long loungeId){
        // 요청자 정보 가져오기
        if(!loungeService.deleteLounge(loungeId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
