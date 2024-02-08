package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String>, MemberCustomRepository{

    Boolean existsByMemberIdOrEmailOrNickname(String memberId, String email, String nickname);

}
