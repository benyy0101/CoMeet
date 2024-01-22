package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.repository.BoardRepository;
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

}
