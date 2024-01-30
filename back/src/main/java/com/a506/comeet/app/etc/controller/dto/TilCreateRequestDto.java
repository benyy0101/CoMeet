package com.a506.comeet.app.etc.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TilCreateRequestDto {

    @NotNull
    public String context;

    @NotNull
    public LocalDate date;

    @Builder
    public TilCreateRequestDto(String context, LocalDate date) {
        this.context = context;
        this.date = date;
    }
}
