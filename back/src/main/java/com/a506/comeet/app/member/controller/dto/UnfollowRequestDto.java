package com.a506.comeet.app.member.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UnfollowRequestDto {

    @NotNull
    private String memberId;

    public UnfollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
