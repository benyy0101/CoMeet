package com.a506.comeet.room.controller;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
//@Validated
public class RoomCreateRequestDto {

    @Setter
    private String mangerId;
//    @NotNull
    private String title;
    private String description;
//    @Min(1)
    private int capacity;
    @Enumerated(EnumType.STRING)
    private RoomConstraints constraints;
    @Enumerated(EnumType.STRING)
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
