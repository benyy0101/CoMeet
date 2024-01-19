package com.a506.comeet.member.controller.dto;

import com.a506.comeet.common.enums.MemberFeature;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
public class MemberUpdateRequestDto {
    @NotNull
    private String name;
    @NotNull
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String password;
    @NotNull
    private String nickname;
    @NotNull
    private String link;
    @NotNull
    private String profileImage;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String description;
    @NotNull
    private MemberFeature feature;

    @Builder
    public MemberUpdateRequestDto(String name, String password, String nickname, String link, String profileImage, String email, String description, MemberFeature feature) {
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.link = link;
        this.profileImage = profileImage;
        this.email = email;
        this.description = description;
        this.feature = feature;
    }

}
