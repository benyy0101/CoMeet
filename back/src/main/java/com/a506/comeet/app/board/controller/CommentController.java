package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.CommentSearchResponseDto;
import com.a506.comeet.app.board.controller.dto.CommentUpdateRequestDto;
import com.a506.comeet.app.board.entity.Comment;
import com.a506.comeet.app.board.service.CommentService;
import com.a506.comeet.common.util.MemberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Long> create(@RequestBody CommentCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Comment comment = commentService.create(req, memberId);
        return ResponseEntity.ok(comment.getId());
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<Void> update(@RequestBody CommentUpdateRequestDto req, @PathVariable(value = "commentId") Long commentId) {
        String memberId = MemberUtil.getMemberId();
        commentService.update(req, commentId, memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(@PathVariable(value = "commentId") Long commentId){
        String memberId = MemberUtil.getMemberId();
        commentService.delete(commentId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<Page<CommentSearchResponseDto>> search(@PathVariable(value = "boardId") Long boardId, @PageableDefault(size = 10) Pageable pageable){
        return ResponseEntity.ok(commentService.search(boardId, pageable));
    }
}