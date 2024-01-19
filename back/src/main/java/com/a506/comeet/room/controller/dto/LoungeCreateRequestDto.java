package com.a506.comeet.room.controller.dto;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

@Getter
public class LoungeCreateRequestDto {

    private Long roomId;
    @Size(min = 2, max = 15)
    private String name;

    public LoungeCreateRequestDto(Long roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
