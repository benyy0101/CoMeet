package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.room.repository.RoomRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    Optional<Board> findByIdAndIsDeletedFalse(Long boardId);
}
