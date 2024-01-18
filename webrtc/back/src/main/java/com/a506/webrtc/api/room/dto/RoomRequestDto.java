package com.a506.webrtc.api.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequestDto {

    // 세션PK
    String sessionId;

    // 방장 사용자PK
    String userId;
}
