package com.a506.comeet.app.etc.controller.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class TilResponseDto {
    private Long id;
    private String memberId;
    private String context;
    private LocalDate date;

    @Builder
    public TilResponseDto(Long id, String memberId, String context, LocalDate date) {
        this.id = id;
        this.memberId = memberId;
        this.context = context;
        this.date = date;
    }
}