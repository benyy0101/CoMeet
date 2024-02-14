package com.a506.comeet.app.etc.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteSimpleResponseDto {
    private Long id;
    private String writerId;
    private String writerNickname;
    private String receiverId;
    private Boolean isRead;
}
