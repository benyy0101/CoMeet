package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;

public interface MemberCustomRepository {

    public int getMemberDuplicationCount(MemberDuplicationRequestDto req);

    public MemberDetailResponseDto getMemberDetail(String memberId);
}
