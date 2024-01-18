package com.a506.comeet.room.controller;

import lombok.Getter;

@Getter
public class RoomJoinRequestDto {
    private String memberId;

    public RoomJoinRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
