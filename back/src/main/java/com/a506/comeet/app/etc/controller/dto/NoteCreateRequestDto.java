package com.a506.comeet.app.etc.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NoteCreateRequestDto {

    @NotNull
    public String context;

    @NotNull
    public String receiverNickname;

}
