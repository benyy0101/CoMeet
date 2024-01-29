package com.a506.comeet.app.member.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FollowRequestDto {

    @NotNull
    private String memberId;

    public FollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
