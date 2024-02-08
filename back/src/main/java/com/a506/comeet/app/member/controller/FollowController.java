package com.a506.comeet.app.member.controller;

import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.member.controller.dto.*;
import com.a506.comeet.app.member.service.FollowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestBody @Valid FollowRequestDto req){
        String memberId = MemberUtil.getMemberId();
        String res = followService.follow(req, memberId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/follow")
    public ResponseEntity<?> unfollow(@RequestBody @Valid UnfollowRequestDto req){
        String reqMemberId = MemberUtil.getMemberId();
        followService.unfollow(req, reqMemberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/follower/{memberId}")
    public ResponseEntity<Slice<MemberSimpleResponseDto>> getFollowers(@Valid FollowerRequestDto req, @PathVariable String memberId){
        return ResponseEntity.ok(followService.getFollowers(req, memberId));
    }

    @GetMapping("/following/{memberId}")
    public ResponseEntity<Slice<MemberSimpleResponseDto>> getFollowings(@Valid FollowingReqeustDto req, @PathVariable String memberId){
        return ResponseEntity.ok(followService.getFollowings(req, memberId));
    }

}
