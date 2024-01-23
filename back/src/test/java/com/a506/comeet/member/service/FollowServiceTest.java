package com.a506.comeet.member.service;

import com.a506.comeet.app.member.entity.Follow;
import com.a506.comeet.app.member.repository.FollowRepository;
import com.a506.comeet.app.member.service.FollowService;
import com.a506.comeet.app.member.controller.FollowRequestDto;
import com.a506.comeet.app.member.controller.FollowerRequestDto;
import com.a506.comeet.app.member.controller.FollowingReqeustDto;
import com.a506.comeet.app.member.controller.UnfollowRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.app.member.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
@Transactional
class FollowServiceTest {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private FollowService followService;

    @Autowired
    private FollowRepository followRepository;

//    @Test
//    @Rollback(value = false)
//    void init(){
//        if (isInitialized) return;
//        em.clear();
//        int N = 10000;
//        for (int i = 1; i <= N; i++) {
//            em.persist(Member.builder().memberId("멤버" + i).build());
//        }
//        em.flush();
//        em.clear();
//
//        String memberId = "멤버" + N;
//
//        // 모든 멤버가 멤버N을 팔로우한다
//        for (int i = 1; i <= N-1; i++) {
//            followService.follow(new FollowRequestDto(memberId), "멤버" + i);
//        }
//
//        // 모든 멤버를 멤버N가 팔로우한다
//        for (int i = 1; i <= N-1; i++) {
//            followService.follow(new FollowRequestDto("멤버" + i), memberId);
//        }
//        em.flush();
//        isInitialized = true;
//    }



    @Test
    @Transactional
    void followTest(){
        List<MemberSimpleResponseDto> followings =
                followService.getFollowing(FollowingReqeustDto.builder().pageNo(0).pageSize(1000).build(), "멤버1")
                        .getContent();

        for (MemberSimpleResponseDto following : followings) {
            log.info("멤버 1의 팔로잉 (멤버 1이 팔로잉하는 사람) : {}", following.getMemberId());
        }
        assertThat(followings.size()).isEqualTo(999);

        List<MemberSimpleResponseDto> followers =
                followService.getFollower(FollowerRequestDto.builder().pageNo(0).pageSize(1000).build(), "멤버1")
                        .getContent();

        for (MemberSimpleResponseDto follower : followers) {
            log.info("멤버 1의 팔로워 (멤버 1을 팔로우하는사람) : {}", follower.getMemberId());
        }
        assertThat(followers.size()).isEqualTo(999);
    }

    @Test
    @Transactional
    void unfollowTest(){
        // 멤버2가 멤버1을 언팔로우했다
        followService.unfollow(new UnfollowRequestDto("멤버1"), "멤버2");
        // 멤버1이 삐져서 멤버2를 언팔로우했다
        followService.unfollow(new UnfollowRequestDto("멤버2"), "멤버1");

        List<MemberSimpleResponseDto> followings =
                followService.getFollowing(FollowingReqeustDto.builder().pageNo(0).pageSize(1000).build(), "멤버1")
                        .getContent();


        for (MemberSimpleResponseDto following : followings) {
            log.info("멤버 1의 팔로잉 (멤버 1이 팔로잉하는 사람) : {}", following.getMemberId());
        }
        assertThat(followings.size()).isEqualTo(998);

        List<MemberSimpleResponseDto> followers =
                followService.getFollower(FollowerRequestDto.builder().pageNo(0).pageSize(1000).build(), "멤버1")
                        .getContent();

        for (MemberSimpleResponseDto follower : followers) {
            log.info("멤버 1의 팔로워 (멤버 1을 팔로우하는사람) : {}", follower.getMemberId());
        }
        assertThat(followers.size()).isEqualTo(998);
    }

    @Test
    @Transactional
    void noOffset(){
        Long srt = System.currentTimeMillis();
        Slice<MemberSimpleResponseDto> legacy = followService.getFollower(FollowerRequestDto.builder().pageNo(98).pageSize(100).build(), "멤버10000");
        log.info("legacy : {}",System.currentTimeMillis() - srt);
        log.info("{}", legacy.getContent().get(99).getMemberId());
        assertThat(legacy.getContent().size()).isEqualTo(100);

        Long srt2 = System.currentTimeMillis();
        Slice<MemberSimpleResponseDto> noOffset = followService.getFollower(FollowerRequestDto.builder().pageNo(98).pageSize(100).prevMemberId("멤버9801").build(), "멤버10000");
        log.info("noOffset : {}",System.currentTimeMillis() - srt2);
        log.info("{}", noOffset.getContent().get(99).getMemberId());
        assertThat(noOffset.getContent().size()).isEqualTo(100);
    }


}