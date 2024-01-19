package com.a506.comeet.member.controller;

import lombok.Getter;

@Getter
public class FollowRequestDto {
    private String memberId;

    public FollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
