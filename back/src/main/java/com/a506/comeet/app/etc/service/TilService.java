package com.a506.comeet.app.etc.service;

import com.a506.comeet.app.etc.controller.dto.*;
import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.etc.repository.TilRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class TilService {

    private final TilRepository tilRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Til create(TilCreateRequestDto req, String memberId) {
        dateDuplicateValidation(req, memberId);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Til til = Til.builder()
                .member(member)
                .context(req.getContext())
                .date(req.getDate())
                .build();
        return tilRepository.save(til);
    }

    private void dateDuplicateValidation(TilCreateRequestDto req, String memberId) {
        if (tilRepository.tilWithMemberAndDateExists(memberId, req.getDate()))
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "해당 날짜의 TIL이 이미 존재합니다");
    }

    @Transactional
    public void update(TilUpdateRequestDto req, Long tilId, String memberId) {
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_TIL));
        authorityValidation(memberId, til);
        til.update(req);
    }



    @Transactional
    public void delete(Long tilId, String memberId) {
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_TIL));
        authorityValidation(memberId, til);
        til.delete();
    }

    public TilResponseDto find(Long tilId){
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_TIL));
        return TilResponseDto.builder()
                .id(til.getId())
                .memberId(til.getMember().getMemberId())
                .context(til.getContext())
                .date(til.getDate())
                .build();
    }

    public TilListResponseDto findList(TilSearchRequestDto req, String memberId) {
        return tilRepository.tilWithSearchRequest(req, memberId);
    }

    private void authorityValidation(String memberId, Til til) {
        if (!til.getMember().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "TIL 작성자가 아닙니다");
    }
}
