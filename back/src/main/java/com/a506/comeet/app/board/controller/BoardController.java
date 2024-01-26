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

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Long> create(@RequestBody BoardCreateRequestDto req) {
        String memberId = "요청자";
        Board board = boardService.create(req, memberId);
        return ResponseEntity.ok(board.getId());
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<LocalDateTime> update(@RequestBody BoardUpdateRequestDto req, @PathVariable(value = "boardId") Long boardId) {
        String memberId = "요청자";
        Board board = boardService.update(req, boardId, memberId);
        return ResponseEntity.ok(board.getUpdatedAt());
    }

    @PatchMapping("/{boardId}/delete")
    public ResponseEntity<Void> delete(@PathVariable(value = "boardId") Long boardId){
        String memberId = "요청자";
        boardService.delete(memberId, boardId);
        return ResponseEntity.ok().build();
    }
}