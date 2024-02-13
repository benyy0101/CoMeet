package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoomUpdateRequestDto {

    private String mangerId;
    @Size(min = 2, max = 30, message = "이름은 2자 이상, 30자 이하여야 합니다.")
    private String title;
    @Size(max = 140, message = "설명은 140자 이하여야 합니다.")
    private String description;
    @Null
    private String roomImage;
    @Size(max = 1000, message = "공지는 1000자 이하여야 합니다.")
    private String notice;
    @Min(value = 1, message = "최소값은 1입니다.")
    @Max(value = 20, message = "최대값은 20입니다.")
    private Integer capacity;
    private Boolean isLocked;
    @Size(min = 4, max = 8, message = "비밀번호는 4자 이상, 8자 이하여야 합니다.")
    private String password;
    private RoomConstraints constraints;
    private List<Long> keywordIds;

    @Builder
    public RoomUpdateRequestDto(String mangerId, String title, String description, String notice, String roomImage, int capacity, Boolean isLocked, String password, RoomConstraints constraints, List<Long> keywordIds) {
        this.mangerId = mangerId;
        this.title = title;
        this.description = description;
        this.notice = notice;
        this.roomImage = roomImage;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.keywordIds = (keywordIds != null) ? keywordIds : Collections.emptyList();
    }
}
