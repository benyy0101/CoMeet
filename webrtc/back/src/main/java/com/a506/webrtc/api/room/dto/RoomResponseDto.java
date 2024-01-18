package com.a506.webrtc.api.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDto {

    // 세션PK
    String sessionId;

    // 방제
    String title;

    // 모드 (N:일반, P:퍼펙트싱어, O:가사맞추기, R:이어부르기)
    String mode;

    // 최대 인원수
    int userMaxCount;

    // 현재 인원수
    int userCount;

    // 공개여부 (Y:공개방, X:비공개방)
    String isPublic;

    // 비밀번호
    String password;
}
