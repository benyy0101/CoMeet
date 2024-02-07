package com.a506.comeet.app.room.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomSimpleResponseDto {
    private Long roomId;
    private String title;
    private String roomImage;
}
