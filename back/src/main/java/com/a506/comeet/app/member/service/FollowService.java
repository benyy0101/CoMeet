package com.a506.comeet.app.member.service;

import com.a506.comeet.app.member.controller.dto.FollowRequestDto;
import com.a506.comeet.app.member.controller.dto.FollowerRequestDto;
import com.a506.comeet.app.member.controller.dto.FollowingReqeustDto;
import com.a506.comeet.app.member.controller.dto.UnfollowRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.app.member.entity.Follow;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.FollowRepository;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class FollowService {

    private final FollowRepository followRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public String follow(FollowRequestDto req, String fromId) {
        if (req.getMemberId().equals(fromId)) return null;
        Member from = memberRepository.findById(fromId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Member to = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        if(followRepository.findByFromAndTo(from, to).isPresent()) throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        Follow created = followRepository.save(new Follow(from, to));
        return created.getTo().getMemberId();
    }

    @Transactional
    public boolean unfollow(UnfollowRequestDto req, String fromId){
        if (req.getMemberId().equals(fromId)) return false;
        Member from = memberRepository.findById(fromId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Member to = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Follow find = followRepository.findByFromAndTo(from, to).orElseThrow(() -> new RestApiException(CommonErrorCode.WRONG_REQUEST));
        followRepository.delete(find);
        return true;
    }

    public Slice<MemberSimpleResponseDto> getFollowers(FollowerRequestDto req, String memberId){
        return followRepository.getFollowers(PageRequest.of(req.getPageNo(), req.getPageSize()), memberId, req.getPrevMemberId());
    }

    public Slice<MemberSimpleResponseDto> getFollowings(FollowingReqeustDto req, String memberId){
        return followRepository.getFollowings(PageRequest.of(req.getPageNo(), req.getPageSize()), memberId, req.getPrevMemberId());
    }
}
