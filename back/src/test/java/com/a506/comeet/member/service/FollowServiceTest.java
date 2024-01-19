package com.a506.comeet.member.service;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.controller.FollowRequestDto;
import com.a506.comeet.member.controller.FollowerRequestDto;
import com.a506.comeet.member.controller.FollowingReqeustDto;
import com.a506.comeet.member.controller.UnfollowRequestDto;
import com.a506.comeet.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.dto.RoomCreateRequestDto;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
@Transactional
class FollowServiceTest {

    @Autowired
    private EntityManager em;

    @Autowired
    private FollowService followService;


    @BeforeEach
    public void init(){
        em.persist(Member.builder().memberId("멤버1").build());
        em.persist(Member.builder().memberId("멤버2").build());
        em.persist(Member.builder().memberId("멤버3").build());
        em.persist(Member.builder().memberId("멤버4").build());
        em.flush();
        em.clear();

        // 멤버 1을 2,3,4가 팔로우한다
        followService.follow(new FollowRequestDto("멤버1"), "멤버2");
        followService.follow(new FollowRequestDto("멤버1"), "멤버3");
        followService.follow(new FollowRequestDto("멤버1"), "멤버4");

        // 멤버 1은 2,3을 팔로우한다
        followService.follow(new FollowRequestDto("멤버2"), "멤버1");
        followService.follow(new FollowRequestDto("멤버3"), "멤버1");
    }

    @Test
    @Transactional
    void followTest(){
        List<MemberSimpleResponseDto> followings =
                followService.getFollowing(new FollowingReqeustDto(0, 30), "멤버1")
                        .getContent();


        for (MemberSimpleResponseDto following : followings) {
            log.info("멤버 1의 팔로잉 (멤버 1이 팔로잉하는 사람) : {}", following.getMemberId());
        }
        assertThat(followings.size()).isEqualTo(2);

        List<MemberSimpleResponseDto> followers =
                followService.getFollower(new FollowerRequestDto(0, 30), "멤버1")
                        .getContent();

        for (MemberSimpleResponseDto follower : followers) {
            log.info("멤버 1의 팔로워 (멤버 1을 팔로우하는사람) : {}", follower.getMemberId());
        }
        assertThat(followers.size()).isEqualTo(3);
    }

    @Test
    @Transactional
    void unfollowTest(){
        // 멤버2가 멤버1을 언팔로우했다
        followService.unfollow(new UnfollowRequestDto("멤버1"), "멤버2");
        // 멤버1이 삐져서 멤버2를 언팔로우했다
        followService.unfollow(new UnfollowRequestDto("멤버2"), "멤버1");

        List<MemberSimpleResponseDto> followings =
                followService.getFollowing(new FollowingReqeustDto(0, 30), "멤버1")
                        .getContent();


        for (MemberSimpleResponseDto following : followings) {
            log.info("멤버 1의 팔로잉 (멤버 1이 팔로잉하는 사람) : {}", following.getMemberId());
        }
        assertThat(followings.size()).isEqualTo(1);

        List<MemberSimpleResponseDto> followers =
                followService.getFollower(new FollowerRequestDto(0, 30), "멤버1")
                        .getContent();

        for (MemberSimpleResponseDto follower : followers) {
            log.info("멤버 1의 팔로워 (멤버 1을 팔로우하는사람) : {}", follower.getMemberId());
        }
        assertThat(followers.size()).isEqualTo(2);
    }



}