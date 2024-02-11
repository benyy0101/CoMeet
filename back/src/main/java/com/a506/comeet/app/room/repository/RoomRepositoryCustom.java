package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.ManagingRoomResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface RoomRepositoryCustom {
    Slice<RoomSearchResponseDto> searchDisposableRoom(RoomSearchRequestDto req, Pageable pageable);

    RoomResponseDto getDetailRoomInfo(Long roomId);

    List<ManagingRoomResponseDto> getManagingRoom(String memberId);

}