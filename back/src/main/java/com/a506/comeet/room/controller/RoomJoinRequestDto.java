package com.a506.comeet.room.controller;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
public class RoomJoinRequestDto {

    @NotNull
    private String memberId;

    public RoomJoinRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
