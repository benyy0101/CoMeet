package com.a506.comeet.member.repository;

import com.a506.comeet.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findByMemberIdAndIsDeletedFalse(String memberId);
}
