package com.a506.comeet.room.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class RoomUpdateRequestDto {
    private String mangerId;
    private String title;
    private String description;
    private String roomImage;
    private String notice;
    private int capacity;
    private boolean isLocked;
    private String password;
    private String constraints;

    @Builder
    public RoomUpdateRequestDto(String mangerId, String title, String description, String roomImage, String notice, int capacity, boolean isLocked, String password, String constraints) {
        this.mangerId = mangerId;
        this.title = title;
        this.description = description;
        this.roomImage = roomImage;
        this.notice = notice;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
    }
}
