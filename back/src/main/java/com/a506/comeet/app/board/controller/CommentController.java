package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.entity.Comment;
import com.a506.comeet.app.board.service.CommentService;
import com.a506.comeet.app.member.MemberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
