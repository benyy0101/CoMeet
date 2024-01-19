package com.a506.comeet.member.controller;

import lombok.Getter;

@Getter
public class FollowerRequestDto {
    private int pageNo;
    private int pageSize;

    public FollowerRequestDto(int pageNo, int pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }
}
