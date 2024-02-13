package com.a506.comeet.app.etc.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TilUpdateRequestDto {

    @NotNull
    public String context;

    @Builder
    public TilUpdateRequestDto(String context) {
        this.context = context;
    }
}
