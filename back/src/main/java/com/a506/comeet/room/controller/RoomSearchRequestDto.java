package com.a506.comeet.room.controller;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import org.springframework.validation.annotation.Validated;

@Validated
public class RoomSearchRequestDto {
    @Size(min = 2, max = 10, message = "검색키워드는 2자 이상, 10자 이하여야 합니다.")
    private String searchKeyword;
    private boolean isLocked;
    private int mcount;
    private int capacity;
    private String constraint;
    private String type;
    @NotNull
    private Integer pageNo;
    @NotNull
    private Integer pageSize;

    @Builder
    public RoomSearchRequestDto(String searchKeyword, boolean isLocked, int mcount, int capacity, String constraint, String type, Integer pageNo, Integer pageSize) {
        this.searchKeyword = searchKeyword;
        this.isLocked = isLocked;
        this.mcount = mcount;
        this.capacity = capacity;
        this.constraint = constraint;
        this.type = type;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }
}
