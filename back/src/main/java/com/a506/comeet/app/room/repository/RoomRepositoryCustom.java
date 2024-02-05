package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.controller.dto.RoomResponseDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.Optional;

public interface RoomRepositoryCustom {
    Slice<RoomSearchResponseDto> searchRoomCustom(RoomSearchRequestDto req, Pageable pageable);

    RoomResponseDto enterRoomCustom(Long roomId);

    public Optional<String> findMemberByRoomIdAndMemberId(Long roomId, String memberId);
}