package com.a506.comeet.member.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberSigninRequestDto {
    @NotNull
    public String memberId;
    @NotNull
    public String name;
    @NotNull
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    public String password;
    @NotNull
    @Email
    public String email;
    @NotNull
    public String nickname;

    @Builder
    public MemberSigninRequestDto(String memberId, String name, String password, String email, String nickname) {
        this.memberId = memberId;
        this.name = name;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
    }
}
