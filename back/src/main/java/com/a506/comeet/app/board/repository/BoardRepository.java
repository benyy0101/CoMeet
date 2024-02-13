package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    boolean existsByTitle(String title);
}
