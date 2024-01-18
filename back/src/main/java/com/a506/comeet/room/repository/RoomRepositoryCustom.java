package com.a506.comeet.room.repository;

import com.a506.comeet.room.controller.RoomSearchRequestDto;
import com.a506.comeet.room.controller.RoomSearchResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface RoomRepositoryCustom {
    Slice<RoomSearchResponseDto> findRoomCustom(RoomSearchRequestDto req, Pageable pageable);
}
