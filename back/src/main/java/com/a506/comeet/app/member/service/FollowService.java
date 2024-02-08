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
        selfValidation(fromId, req.getMemberId());

        Member from = memberRepository.findById(fromId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Member to = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        alreadyFollowingValidation(from, to);

        Follow created = followRepository.save(new Follow(from, to));
        return created.getTo().getMemberId();
    }

    private void alreadyFollowingValidation(Member from, Member to) {
        if(followRepository.findByFromAndTo(from, to).isPresent())
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "이미 팔로우하고 있습니다");
    }

    private void selfValidation(String fromId, String toId) {
        if (fromId.equals(toId))
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "자기 자신을 팔로우 할 수 없습니다");
    }

    @Transactional
    public void unfollow(UnfollowRequestDto req, String fromId){
        selfValidation(fromId, req.getMemberId());

        Member from = memberRepository.findById(fromId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Member to = memberRepository.findById(req.getMemberId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Follow find = followRepository.findByFromAndTo(from, to).orElseThrow(() -> new RestApiException(CommonErrorCode.WRONG_REQUEST, "해당 유저를 팔로우하고 있지 않습니다"));
        followRepository.delete(find);
    }

    public Slice<MemberSimpleResponseDto> getFollowers(FollowerRequestDto req, String memberId){
        return followRepository.getFollowers(PageRequest.of(req.getPageNo(), req.getPageSize()), memberId, req.getPrevMemberId());
    }

    public Slice<MemberSimpleResponseDto> getFollowings(FollowingReqeustDto req, String memberId){
        return followRepository.getFollowings(PageRequest.of(req.getPageNo(), req.getPageSize()), memberId, req.getPrevMemberId());
    }
}
