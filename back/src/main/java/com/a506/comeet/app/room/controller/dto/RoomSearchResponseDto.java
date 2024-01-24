package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RoomSearchResponseDto {

    private Long roomId;
    private String managerId;
    private String managerNickname;
    private String title;
    private String description;
    private String link;
    private String roomImage;
    private int mcount;
    private int capacity;
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    private RoomType type;
    private LocalDateTime createdAt;

    @QueryProjection
    public RoomSearchResponseDto(Long roomId, String managerId, String managerNickname, String title, String description, String link, String roomImage, int mcount, int capacity, Boolean isLocked, String password, RoomConstraints constraints, RoomType type, LocalDateTime createdAt) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.title = title;
        this.description = description;
        this.link = link;
        this.roomImage = roomImage;
        this.mcount = mcount;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
        this.createdAt = createdAt;
    }
}
