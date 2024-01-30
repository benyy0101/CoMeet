package com.a506.comeet.app.room.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@NoArgsConstructor
public class RoomJoinRequestDto {

    @NotNull
    private String memberId;

    public RoomJoinRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
