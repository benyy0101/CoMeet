package com.a506.comeet.app.member.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UnfollowRequestDto {

    @NotNull
    private String memberId;

    public UnfollowRequestDto(String memberId) {
        this.memberId = memberId;
    }
}
