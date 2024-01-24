package com.a506.comeet.app.member.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberDuplicationRequestDto {
    private String memberId;
    private String nickname;
    private String email;

    @Builder
    public MemberDuplicationRequestDto(String memberId, String nickname, String email) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.email = email;
    }

    public boolean isAllNull(){
        return memberId == null && nickname == null && email == null;
    }
}
