package com.a506.comeet.app.etc.repository;

import com.a506.comeet.app.etc.controller.dto.TilListResponseDto;
import com.a506.comeet.app.etc.controller.dto.TilSearchRequestDto;

import java.time.LocalDate;

public interface TilCustomRepository {

    boolean tilWithMemberAndDateExists(String memberId, LocalDate date);

    TilListResponseDto tilWithSearchRequest(TilSearchRequestDto req, String memberId);
}
