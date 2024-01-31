package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.CommentUpdateRequestDto;
import com.a506.comeet.app.board.entity.Comment;
import com.a506.comeet.app.board.service.CommentService;
import com.a506.comeet.app.member.MemberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    public ResponseEntity<LocalDateTime> update(@RequestBody CommentUpdateRequestDto req, @PathVariable(value = "commentId") Long commentId) {
        String memberId = MemberUtil.getMemberId();
        Comment comment = commentService.update(req, commentId, memberId);
        return ResponseEntity.ok(comment.getUpdatedAt());
    }
}
