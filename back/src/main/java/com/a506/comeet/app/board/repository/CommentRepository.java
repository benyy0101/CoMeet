package com.a506.comeet.app.board.repository;

import com.a506.comeet.app.board.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByBoardId(Long boardId, Pageable pageable);

    boolean existsByBoardIdAndContent(Long boardId, String content);
}
