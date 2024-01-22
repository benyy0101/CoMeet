package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;

public interface MemberCustomRepository {

    public int memberDuplicationCount(MemberDuplicationRequestDto req);
}
