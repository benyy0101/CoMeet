package com.a506.webrtc.api.room.client;

import java.util.List;

import com.a506.webrtc.api.room.dto.RoomDto;
import com.a506.webrtc.api.room.dto.RoomRequestDto;
import com.a506.webrtc.api.room.dto.RoomResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// @FeignClient(name = "room-client", url = "localhost:8070/api/v1/room")
@FeignClient(name = "room-client", url = "session:8070/api/v1/room")
public interface RoomClient {

    @GetMapping
    List<RoomResponseDto> findAllRoom();

    @GetMapping("/{sessionId}")
    RoomDto findRoomBySessionId(@PathVariable String sessionId);

    @PostMapping
    void createRoom(@RequestBody RoomDto roomDto);

    @PutMapping("/in")
    void enterRoom(@RequestBody RoomRequestDto roomRequestDto);

    @PutMapping("/out")
    void leaveRoom(@RequestBody RoomRequestDto roomRequestDto);

    @PutMapping
    void updateRoom(@RequestBody RoomDto roomDto);

    @DeleteMapping("/{sessionId}")
    void deleteRoom(@PathVariable String sessionId);
}