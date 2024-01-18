package com.a506.webrtc.api.room.service;

import com.a506.webrtc.api.room.dto.RoomDto;
import com.a506.webrtc.api.room.dto.RoomRequestDto;
import com.a506.webrtc.api.room.dto.RoomResponseDto;

import java.util.List;

public interface RoomService {

    List<RoomResponseDto> findAllRoom();

    RoomDto findRoomBySessionId(String sessionId);

    void createRoom(RoomDto roomDto);

    void enterRoom(RoomRequestDto roomEntryDto);

    void leaveRoom(RoomRequestDto roomEntryDto);

    void updateRoom(RoomDto roomDto);

    void deleteRoom(String sessionId);
}