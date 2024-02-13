package com.a506.comeet.auth.controller.dto;

import com.a506.comeet.app.room.controller.dto.RoomSimpleResponseDto;
import com.a506.comeet.auth.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponseDto {

    private String memberId;
    private String nickname;
    private String profileImage;
    private JwtToken jwtToken;

    private Integer unreadNoteCount;
    private List<RoomSimpleResponseDto> joinedRooms;


}
