package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.*;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.service.BoardService;
import com.a506.comeet.app.member.MemberUtil;
import com.a506.comeet.app.room.controller.dto.RoomSearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Long> create(@RequestBody BoardCreateRequestDto req) {
        String memberId = MemberUtil.getMemberId();
        Board board = boardService.create(req, memberId);
        return ResponseEntity.ok(board.getId());
    }

    @PatchMapping("{boardId}")
    public ResponseEntity<LocalDateTime> update(@RequestBody BoardUpdateRequestDto req, @PathVariable(value = "boardId") Long boardId) {
        String memberId = MemberUtil.getMemberId();
        Board board = boardService.update(req, boardId, memberId);
        return ResponseEntity.ok(board.getUpdatedAt());
    }

    @DeleteMapping("{boardId}")
    public ResponseEntity<Void> delete(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.delete(boardId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Slice<BoardListResponseDto>> search(@ModelAttribute BoardListRequestDto req){
        Slice<BoardListResponseDto> res = boardService.search(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping("{boardId}")
    public ResponseEntity<BoardDetailResponseDto> getById(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        return ResponseEntity.ok(boardService.getById(boardId, memberId));
    }

    @PostMapping("{boardId}/like")
    public ResponseEntity<Void> addLike(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.addLike(boardId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{boardId}/like")
    public ResponseEntity<Void> removeLike(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.removeLike(boardId, memberId);
        return ResponseEntity.ok().build();
    }
}