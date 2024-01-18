package com.a506.comeet.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
public class RoomCreateRequestDto {

    @Setter
    private String mangerId;
    @NotNull
    @Size(min = 2, max = 30, message = "이름은 2자 이상, 30자 이하여야 합니다.")
    private String title;
    @Size(max = 140, message = "설명은 140자 이하여야 합니다.")
    private String description;
    @Min(value = 1, message = "최소값은 1입니다.")
    @Max(value = 20, message = "최대값은 20입니다.")
    private int capacity;
    private RoomConstraints constraints;
    private RoomType type;

    @Builder
    public RoomCreateRequestDto(String mangerId, String title, String description, int capacity, RoomConstraints constraints, RoomType type) {
        this.mangerId = mangerId;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
    }
}
