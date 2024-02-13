package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String>, MemberCustomRepository{

    Optional<Member> findByNickname(String nickname);

    boolean existsByMemberIdOrEmailOrNickname(String memberId, String email, String nickname);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

}
