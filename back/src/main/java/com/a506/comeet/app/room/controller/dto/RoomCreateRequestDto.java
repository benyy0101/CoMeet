package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
public class RoomCreateRequestDto {

    @Setter
    private String managerId;
    @NotNull
    @Size(min = 2, max = 30, message = "이름은 2자 이상, 30자 이하여야 합니다.")
    private String title;
    @Size(max = 140, message = "설명은 140자 이하여야 합니다.")
    private String description;
    @Min(value = 1, message = "최소값은 1입니다.")
    @Max(value = 20, message = "최대값은 20입니다.")
    private int capacity;
    @NotNull
    private RoomConstraints constraints;
    @NotNull
    private RoomType type;
    private List<Long> keywordIds;

    public RoomCreateRequestDto(String managerId, String title, String description, int capacity, RoomConstraints constraints, RoomType type, List<Long> keywordIds) {
        this.managerId = managerId;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
        this.keywordIds = (keywordIds != null) ? keywordIds : Collections.emptyList();
    }
}
