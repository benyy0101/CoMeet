package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardSearchResponseDto {
    private Long id;
    private String title;
    private String content;
    private Integer likeCount;
    private BoardType type;
    private FreeBoardCategory category;
    private Long roomId;
    private Boolean valid;
    private Boolean isLike; // 좋아요 여부

    public static BoardSearchResponseDto toBoardSearchResponseDto(Board board, Boolean isLike) {
        return BoardSearchResponseDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .likeCount(board.getLikecount())
                .type(board.getType())
                .category(board.getCategory())
                .roomId(board.getRoomId())
                .valid(board.getValid())
                .isLike(isLike)
                .build();
    }
}