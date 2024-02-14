package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.enums.RoomConstraints;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String roomImage;
    private Integer capacity;
    @Setter
    private Integer currentMcount;
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;
    private List<KeywordResponseDto> keywords;

    public RoomSearchResponseDto(Room room){
        this.roomId = room.getId();
        this.managerId = room.getManager().getMemberId();
        this.managerNickname = room.getManager().getNickname();
        this.title = room.getTitle();
        this.description = room.getDescription();
        this.roomImage = room.getRoomImage();
        this.capacity = room.getCapacity();
        this.isLocked = room.getIsLocked();
        this.password = room.getPassword();
        this.constraints = room.getConstraints();
        this.createdAt = room.getCreatedAt();
        this.keywords = room.getRoomKeywords().stream().map(a -> new KeywordResponseDto(a.getKeyword().getId(), a.getKeyword().getName())).toList();
    }
}