package com.a506.comeet.app.etc.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class TilResponseDto {
    private Long id;
    private String memberId;
    private String context;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Builder
    public TilResponseDto(Long id, String memberId, String context, LocalDate date) {
        this.id = id;
        this.memberId = memberId;
        this.context = context;
        this.date = date;
    }
}
