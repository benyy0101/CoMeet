package com.a506.comeet.app.etc.controller.dto;

import jakarta.validation.constraints.NotNull;
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

}
