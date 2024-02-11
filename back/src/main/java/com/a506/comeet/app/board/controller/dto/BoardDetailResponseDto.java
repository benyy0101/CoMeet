package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponseDto {

    private Long id;
    private String title;
    private String content;
    private Integer likeCount;
    private BoardType type;
    private FreeBoardCategory category;
    @Builder.Default
    private Boolean isValid = true; // true - 모집 중, false - 모집 완료

    private List<KeywordResponseDto> roomKeywords; //방 키워드
    private String roomTitle;   //방 제목
    private String roomDescription; //방 소개
    private Integer roomMcount; //방 현재 인원수
    private Integer roomCapacity; //방 최대 인원수
    private String roomImage; //방 이미지
    private Boolean isLocked; //방 잠금 여부

    private String writerNickname; //작성자 닉네임
    private String writerImage; //작성자 이미지
    private Boolean isLike; // 좋아요 여부

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt; //작성 날짜
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime updatedAt; //수정 날짜

    public static BoardDetailResponseDto toBoardSearchResponseDto(Board board, Room room, List<KeywordResponseDto> keywords, Boolean isLike) {

        return BoardDetailResponseDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .likeCount(board.getLikeCount())
                .type(board.getType())
                .category(board.getCategory())
                .isValid(board.getIsValid())

                //자유 게시판에는 null이 들어감
                .roomKeywords(room != null ? keywords : null)
                .roomTitle(room != null ? room.getTitle() : null)
                .roomDescription(room != null ? room.getDescription() : null)
                .roomMcount(room != null ? room.getMcount() : null)
                .roomCapacity(room != null ? room.getCapacity() : null)
                .roomImage(room != null ? room.getRoomImage() : null)
                .isLocked(room != null ? room.getIsLocked() : null)

                .writerNickname(board.getWriter().getNickname())
                .writerImage(board.getWriter().getProfileImage())
                .isLike(isLike)
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .build();
    }
}