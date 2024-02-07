package com.a506.comeet.app.room.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class ChannelCreateRequestDto {

    @NotNull
    private Long roomId;
    @NotBlank
    @Size(min = 2, max = 15)
    private String name;

    public ChannelCreateRequestDto(Long roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
