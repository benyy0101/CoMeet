package com.a506.comeet.room.repository;

import com.a506.comeet.room.controller.dto.RoomResponseDto;
import com.a506.comeet.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.room.controller.dto.RoomSearchResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface RoomRepositoryCustom {
    Slice<RoomSearchResponseDto> findRoomCustom(RoomSearchRequestDto req, Pageable pageable);
    RoomResponseDto enterRoomCustom(Long roomId);
}
