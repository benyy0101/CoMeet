package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.app.room.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ManagingRoomResponseDto {
    private Long roomId;
    private String title;
    private boolean isFull;


    public static ManagingRoomResponseDto toDto(Room room){
        return new ManagingRoomResponseDto(room.getId(), room.getTitle(), room.getMcount() == room.getCapacity());
    }
}
