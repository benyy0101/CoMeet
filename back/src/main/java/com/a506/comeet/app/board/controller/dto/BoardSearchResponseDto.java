package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
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
    private Boolean isValid = true; // true - 모집 중, false - 모집 완료

    private String roomKeywords; //방 키워드
    private String roomTitle;   //방 제목
    private String roomDescription; //방 소개
    private Integer roomMcount; //방 현재 인원수
    private Integer roomCapacity; //방 최대 인원수
    private String link; //방 url
    private String roomImage; //방 이미지

    private String writerNickname; //작성자 닉네임
    private String writerImage; //작성자 이미지
    private Boolean isLike; // 좋아요 여부

    private String createdAt; //작성 날짜

    public static BoardSearchResponseDto toBoardSearchResponseDto(Board board, Room room, Member writer, String keywordsString, Boolean isLike) {

        return BoardSearchResponseDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .likeCount(board.getLikeCount())
                .type(board.getType())
                .category(board.getCategory())
                .isValid(board.getIsValid())

                //자유 게시판에는 null이 들어감
                .roomKeywords(room != null ? keywordsString : null)
                .roomTitle(room != null ? room.getTitle() : null)
                .roomDescription(room != null ? room.getDescription() : null)
                .roomMcount(room != null ? room.getMcount() : null)
                .roomCapacity(room != null ? room.getCapacity() : null)
                .link(room != null ? room.getLink() : null)
                .roomImage(room != null ? room.getRoomImage() : null)

                .writerNickname(writer.getNickname())
                .writerImage(writer.getProfileImage())
                .isLike(isLike)
                .createdAt(board.getCreatedAt().toString()) // 형식 변환 필요할 수 있음
                .build();
    }
}