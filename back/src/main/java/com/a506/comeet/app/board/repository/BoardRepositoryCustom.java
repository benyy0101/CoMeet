package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.controller.dto.BoardListRequestDto;
import com.a506.comeet.app.board.controller.dto.BoardListResponseDto;
import org.springframework.data.domain.Slice;

public interface BoardRepositoryCustom {
    Slice<BoardListResponseDto> searchBoardCustom(BoardListRequestDto req);
}