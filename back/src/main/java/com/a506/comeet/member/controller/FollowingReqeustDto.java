package com.a506.comeet.member.controller;

import lombok.Getter;

@Getter
public class FollowingReqeustDto {
    private int pageNo;
    private int pageSize;

    public FollowingReqeustDto(int pageNo, int pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }
}
