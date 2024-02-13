package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository{

    Optional<Follow> findByFromAndTo(Member from, Member to);

    boolean existsByFromMemberIdAndToMemberId(String memberId, String fromId);
}
