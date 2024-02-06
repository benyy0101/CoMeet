package com.a506.comeet.app.member.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class FollowRequestDto {

    @NotNull
    private String memberId;

    public FollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
