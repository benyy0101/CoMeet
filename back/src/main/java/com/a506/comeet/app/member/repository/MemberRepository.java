package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String>, MemberCustomRepository{

    Optional<Member> findByNickname(String nickname);

    boolean existsByMemberIdOrEmailOrNickname(String memberId, String email, String nickname);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    @Modifying
    @Query("SELECT count(m) FROM Member m WHERE m.memberId = :memberId")
    int countByMemberIdDeletedIncluded(@Param("memberId") String memberId);

    @Modifying
    @Query("SELECT count(m) FROM Member m WHERE m.email = :email")
    int countByEmailDeletedIncluded(@Param("email") String email);

    @Modifying
    @Query("SELECT count(m) FROM Member m WHERE m.nickname = :nickname")
    int countByNicknameDeletedIncluded(@Param("nickname") String nickname);

}
