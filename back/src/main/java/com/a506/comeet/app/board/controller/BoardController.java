package com.a506.comeet.app.board.controller;

import com.a506.comeet.app.board.controller.dto.BoardCreateRequestDto;
import com.a506.comeet.app.board.service.BoardService;
import com.a506.comeet.app.member.entity.Member;
import lombok.RequiredArgsConstructor;
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

    @PostMapping(value = "/create")
    public ResponseEntity<?> create(@RequestBody BoardCreateRequestDto boardRequestDto) {
        Member member = new Member("abc", "작성자", "123", "닉네임", "abc@naver.com");
        return ResponseEntity.ok(boardService.create(boardRequestDto, member));
    }
}
