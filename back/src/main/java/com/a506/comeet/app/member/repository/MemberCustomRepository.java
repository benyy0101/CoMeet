package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberCustomRepository {

    int getMemberDuplicationCount(MemberDuplicationRequestDto req);

    Optional<MemberDetailResponseDto> getMemberDetail(String memberId);

    List<MemberSimpleResponseDto> getCurrentMembers(Set<String> currentMemberIdSet);
}
