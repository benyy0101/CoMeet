package com.a506.comeet.room.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

@Getter
public class RoomJoinRequestDto {

    @NotNull
    private String memberId;

    public RoomJoinRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
