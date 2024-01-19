package com.a506.comeet.member.repository;

import com.a506.comeet.member.controller.FollowerRequestDto;
import com.a506.comeet.member.controller.FollowingReqeustDto;
import com.a506.comeet.member.controller.dto.MemberSimpleResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface FollowCustomRepository {

    Slice<MemberSimpleResponseDto> getFollowers(Pageable pageable, String memberId);
    Slice<MemberSimpleResponseDto> getFollowings(Pageable pageable, String memberId);
}
