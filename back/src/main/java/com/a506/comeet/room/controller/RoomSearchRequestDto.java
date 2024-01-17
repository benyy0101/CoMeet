package com.a506.comeet.room.controller;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
@Getter
public class RoomSearchRequestDto {
    @Size(min = 2, max = 10, message = "검색키워드는 2자 이상, 10자 이하여야 합니다.")
    private String searchKeyword;
    private Boolean isLocked;
    private Integer minMcount;
    private Integer maxMcount;

    private Integer minCapacity;
    private Integer maxCapacity;
    private List<RoomConstraints> constraints;
    private RoomType type;
    @NotNull
    private Integer pageNo;
    @NotNull
    private Integer pageSize;

    @Builder
    public RoomSearchRequestDto(String searchKeyword, Boolean isLocked, Integer minMcount, Integer maxMcount, Integer minCapacity, Integer maxCapacity, List<RoomConstraints> constraints, RoomType type, Integer pageNo, Integer pageSize) {
        this.searchKeyword = searchKeyword;
        this.isLocked = isLocked;
        this.minMcount = minMcount;
        this.maxMcount = maxMcount;
        this.minCapacity = minCapacity;
        this.maxCapacity = maxCapacity;
        this.constraints = constraints;
        this.type = type;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
    }
}
