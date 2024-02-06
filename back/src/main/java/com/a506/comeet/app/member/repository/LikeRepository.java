package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.member.entity.Like;
import com.a506.comeet.app.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByBoardAndMember(Board board, Member member);
    boolean existsByBoardAndMember(Board board, Member member);
}
