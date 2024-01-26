package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.BoardCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Slf4j
@Service
@Validated
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Board create(BoardCreateRequestDto req, String memberId) {
        Board board = Board.builder()
                .writerId(memberId)
                .title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .category(req.getCategory())
                .roomId(req.getRoomId())
                .valid(req.getValid())
                .build();

        return boardRepository.save(board);
    }

    @Transactional
    public Board update(BoardUpdateRequestDto req, Long boardId, String memberId) {
        Board board = boardRepository.findByIdAndIsDeletedFalse(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(board, memberId);
        board.update(req);
        return board;
    }

    @Transactional
    public void delete(String memberId, Long boardId) {
        Board board = boardRepository.findByIdAndIsDeletedFalse(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(board, memberId);
        board.delete();
    }

    private void authorityValidation(Board board, String memberId) {
        if (!board.getWriterId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
    }
}