package com.a506.comeet.app.member.controller.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowingReqeustDto {
    private int pageNo;
    private int pageSize;
    @Nullable
    private String prevMemberId;

    @Builder
    public FollowingReqeustDto(int pageNo, int pageSize, String prevMemberId) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.prevMemberId = prevMemberId;
    }
}
