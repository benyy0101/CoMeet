package com.a506.comeet.app.etc.controller.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TilSearchRequestDto {

    @Min(2000)
    @Max(9999)
    private int year;
    @Min(1)
    @Max(12)
    private int month;

    @Builder
    public TilSearchRequestDto(int year, int month) {
        this.year = year;
        this.month = month;
    }
}
