package com.a506.comeet.app.etc.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TilRequestDto {

    @NotNull
    public String context;

    @NotNull
    public LocalDate date;

    @Builder
    public TilRequestDto(String context, LocalDate date) {
        this.context = context;
        this.date = date;
    }
}
