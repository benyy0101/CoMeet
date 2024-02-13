package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.*;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.service.BoardService;
import com.a506.comeet.common.util.MemberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/{boardId}")
    public ResponseEntity<Void> update(@RequestBody BoardUpdateRequestDto req, @PathVariable(value = "boardId") Long boardId) {
        String memberId = MemberUtil.getMemberId();
        boardService.update(req, boardId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> delete(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.delete(boardId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<BoardListResponseDto>> search(BoardListRequestDto req,
        @PageableDefault(size = 10) Pageable pageable){
        return ResponseEntity.ok(boardService.search(req, pageable));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDetailResponseDto> getById(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        return ResponseEntity.ok(boardService.getById(boardId, memberId));
    }

    @PostMapping("/{boardId}/like")
    public ResponseEntity<Void> addLike(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.addLike(boardId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{boardId}/like")
    public ResponseEntity<Void> removeLike(@PathVariable(value = "boardId") Long boardId){
        String memberId = MemberUtil.getMemberId();
        boardService.removeLike(boardId, memberId);
        return ResponseEntity.ok().build();
    }
}