package com.a506.comeet.member.repository;

import com.a506.comeet.member.entity.Follow;
import com.a506.comeet.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository{

    Optional<Follow> findByFromAndTo(Member from, Member to);



}
