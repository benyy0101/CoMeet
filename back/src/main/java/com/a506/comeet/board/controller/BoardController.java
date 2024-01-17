package com.a506.comeet.board.controller;

import com.a506.comeet.board.service.BoardService;
import com.a506.comeet.room.controller.RoomCreateRequestDto;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;


    @PostMapping("")
    public ResponseEntity<Void> createRoom(@RequestBody RoomCreateRequestDto requestDto) {
        return null;
    }
}
