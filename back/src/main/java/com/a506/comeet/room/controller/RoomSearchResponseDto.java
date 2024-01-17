package com.a506.comeet.room.controller;

import com.a506.comeet.common.enums.RoomConstraint;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomSearchResponseDto {

    private Long roomId;
    private String managerId;
    private String managerNickname;
    private String title;
    private String description;
    private String url;
    private String roomImage;
    private int mcount;
    private int capacity;
    private Boolean isLocked;
    private String password;
    private RoomConstraint constraint;
    private RoomType type;

    @QueryProjection
    public RoomSearchResponseDto(Long roomId, String managerId, String managerNickname, String title, String description, String url, String roomImage, int mcount, int capacity, Boolean isLocked, String password, RoomConstraint constraint, RoomType type) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.title = title;
        this.description = description;
        this.url = url;
        this.roomImage = roomImage;
        this.mcount = mcount;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraint = constraint;
        this.type = type;
    }
}
