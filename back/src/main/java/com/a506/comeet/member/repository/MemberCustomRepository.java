package com.a506.comeet.member.repository;

import com.a506.comeet.member.controller.dto.MemberDuplicationRequestDto;

public interface MemberCustomRepository {

    public int memberDuplicationCount(MemberDuplicationRequestDto req);
}
