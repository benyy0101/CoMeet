package com.a506.comeet.app.etc.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoteResponseDto {
    private Long id;
    private String writerId;
    private String receiverId;
    private String context;
    private Boolean isRead;
    @JsonFormat(pattern = "yyyy-MM-dd hh-mm-ss")
    private LocalDateTime createdAt;

    @Builder
    public NoteResponseDto(Long id, String writerId, String receiverId, String context, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.writerId = writerId;
        this.receiverId = receiverId;
        this.context = context;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
}
