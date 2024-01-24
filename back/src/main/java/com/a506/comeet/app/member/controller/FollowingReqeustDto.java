package com.a506.comeet.app.member.controller;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowingReqeustDto {
    private int pageNo;
    private int pageSize;
    private String prevMemberId;

    @Builder
    public FollowingReqeustDto(int pageNo, int pageSize, String prevMemberId) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.prevMemberId = prevMemberId;
    }
}
