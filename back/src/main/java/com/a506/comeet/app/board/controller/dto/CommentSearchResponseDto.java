package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Comment;
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

    private Long boardId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String WriterNickname;

    public static CommentSearchResponseDto toCommentSearchResponseDto(Comment comment) {
        return CommentSearchResponseDto.builder()
                .boardId(comment.getBoard().getId())
                .content(comment.getContent())
                .WriterNickname(comment.getWriter().getNickname())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
