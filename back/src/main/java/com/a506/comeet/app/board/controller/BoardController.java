package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.BoardCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.service.BoardService;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.controller.dto.RoomUpdateRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BoardCreateRequestDto boardRequestDto) {
        String memberId = "요청자";
        Board board = boardService.create(boardRequestDto, memberId);
        return ResponseEntity.ok(board.getId());
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<?> update(@RequestBody BoardUpdateRequestDto req, @PathVariable(value = "boardId") Long boardId) {
        System.out.println(boardId);
        String memberId = "요청자";
        boardService.update(req, boardId, memberId);
        return ResponseEntity.ok().build();
    }
}