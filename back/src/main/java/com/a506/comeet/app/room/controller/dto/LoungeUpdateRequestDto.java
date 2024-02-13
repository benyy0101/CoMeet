package com.a506.comeet.app.room.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@NoArgsConstructor
public class LoungeUpdateRequestDto {

    @NotBlank
    @Size(min = 2, max = 15)
    private String name;

    public LoungeUpdateRequestDto(String name) {
        this.name = name;
    }
}
