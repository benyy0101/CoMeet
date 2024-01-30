package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.controller.dto.BoardListRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardListResponseDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
    Page<BoardListResponseDto> searchBoardCustom(BoardListRequestDto req, Pageable pageable);
}