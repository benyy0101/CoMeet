package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentSearchResponseDto {

    private Long id;
    private Long boardId;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime updatedAt;
    private String WriterNickname;

    public static CommentSearchResponseDto toCommentSearchResponseDto(Comment comment) {
        return CommentSearchResponseDto.builder()
                .id(comment.getId())
                .boardId(comment.getBoard().getId())
                .content(comment.getContent())
                .WriterNickname(comment.getWriter().getNickname())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}