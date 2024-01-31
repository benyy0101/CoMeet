package com.a506.comeet.app.board.controller.dto;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardListResponseDto {
	private Long id;
	private String title;
	private String content;
	private Integer likeCount;
	private BoardType type;
	private FreeBoardCategory category;
	private Boolean isValid = true; // true - 모집 중, false - 모집 완료

	private String roomKeywords; //방 키워드
	private String roomImage; //방 이미지

	private String writerNickname; //작성자 닉네임
	private String writerImage; //작성자 이미지

	private LocalDateTime createdAt; //작성 날짜

	public static BoardListResponseDto toBoardListResponseDto(Board board, Room room, Member writer, String keywordsString) {

		return BoardListResponseDto.builder()
			.id(board.getId())
			.title(board.getTitle())
			.content(board.getContent())
			.likeCount(board.getLikeCount())
			.type(board.getType())
			.category(board.getCategory())
			.isValid(board.getIsValid())
			.roomKeywords(room != null ? keywordsString : null)
			.roomImage(room != null ? room.getRoomImage() : null)
			.writerNickname(writer.getNickname())
			.writerImage(writer.getProfileImage())
			.createdAt(board.getCreatedAt())
			.build();
	}
}
