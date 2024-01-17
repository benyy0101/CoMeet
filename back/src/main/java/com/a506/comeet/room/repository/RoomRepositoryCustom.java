package com.a506.comeet.room.repository;

import com.a506.comeet.room.controller.RoomSearchRequestDto;
import com.a506.comeet.room.controller.RoomSearchResponseDto;

import java.util.List;

public interface RoomRepositoryCustom {
    List<RoomSearchResponseDto> findRoomCustom(RoomSearchRequestDto req);
}
