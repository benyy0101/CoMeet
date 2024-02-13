package com.a506.comeet.app.member.controller.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class FollowerRequestDto {
    private int pageNo;
    private int pageSize;
    @Nullable
    private String prevMemberId;

    @Builder
    public FollowerRequestDto(int pageNo, int pageSize, String prevMemberId) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.prevMemberId = prevMemberId;
    }
}
