package com.a506.webrtc.api.room.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {

    // 세션PK
    String sessionId;

    // 방장 사용자PK
    String userId;

    // 방제
    String title;

    // 모드 (N:일반, P:퍼펙트싱어, O:가사맞추기, R:이어부르기)
    String mode;

    // 최대 인원수
    int userMaxCount;

    // 공개여부 (Y:공개방, X:비공개방)
    String isPublic;

    // 비밀번호
    String password;

    // 사용자 목록
    List<String> userList = new ArrayList<>();
}
