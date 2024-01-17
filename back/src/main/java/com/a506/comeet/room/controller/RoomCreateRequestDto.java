package com.a506.comeet.room.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class RoomCreateRequestDto {

    @Setter
    private String mangerId;
    private String title;
    private String description;
    private int capacity;
    private String constraints;
    private String type;

    @Builder
    public RoomCreateRequestDto(String mangerId, String title, String description, int capacity, String constraints, String type) {
        this.mangerId = mangerId;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
    }
}
