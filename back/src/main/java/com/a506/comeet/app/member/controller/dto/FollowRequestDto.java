package com.a506.comeet.app.member.controller.dto;

import lombok.Getter;

@Getter
public class FollowRequestDto {
    private String memberId;

    public FollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
