package com.a506.comeet.app.member.controller.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberDuplicationRequestDto {
    @Nullable
    private String memberId;
    @Nullable
    private String nickname;
    @Nullable
    @Email
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
