package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoomSearchResponseDto {
    private Long roomId;
    private String managerId;
    private String managerNickname;
    private String title;
    private String description;
    private String link;
    private String roomImage;
    private Integer capacity;
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    private RoomType type;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;
    private List<KeywordResponseDto> keywords;

    @QueryProjection
    public RoomSearchResponseDto(Long roomId, String managerId, String managerNickname, String title, String description, String link, String roomImage, Integer capacity, Boolean isLocked, String password, RoomConstraints constraints, RoomType type, LocalDateTime createdAt, List<KeywordResponseDto> keywords) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.title = title;
        this.description = description;
        this.link = link;
        this.roomImage = roomImage;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
        this.createdAt = createdAt;
        this.keywords = keywords;
    }

    public RoomSearchResponseDto(Room room){
        this.roomId = room.getId();
        this.managerId = room.getManager().getMemberId();
        this.managerNickname = room.getManager().getNickname();
        this.title = room.getTitle();
        this.description = room.getDescription();
        this.link = room.getLink();
        this.roomImage = room.getRoomImage();
        this.capacity = room.getCapacity();
        this.isLocked = room.getIsLocked();
        this.password = room.getPassword();
        this.constraints = room.getConstraints();
        this.type = room.getType();
        this.createdAt = room.getCreatedAt();
        this.keywords = room.getRoomKeywords().stream().map(a -> new KeywordResponseDto(a.getKeyword().getId(), a.getKeyword().getName())).toList();
    }
}
