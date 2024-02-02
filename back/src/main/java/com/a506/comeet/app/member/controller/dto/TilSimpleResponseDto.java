package com.a506.comeet.app.member.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TilSimpleResponseDto {
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
