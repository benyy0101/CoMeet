package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.BoardCreateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
@Validated
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Board create(BoardCreateRequestDto req, Member member) {

        String memberId = member.getMemberId();

        Board board = Board.builder()
                .writerId(memberId)
                .title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .categoty(req.getCategory())
                .roomId(req.getRoomId())
                .valid(req.getValid())
                .build();

        return boardRepository.save(board);
    }

}
