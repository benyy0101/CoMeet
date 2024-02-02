package com.a506.comeet.auth.controller.dto;

import com.a506.comeet.auth.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponseDto {

    private String nickname;
    private String profileImage;
    private JwtToken jwtToken;


}
