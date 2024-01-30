package com.a506.comeet.app.etc.service;

import com.a506.comeet.app.etc.controller.dto.*;
import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.etc.repository.TilRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class TilService {

    private final TilRepository tilRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public Til create(TilCreateRequestDto req, String memberId) {
        if (tilRepository.tilWithMemberAndDateExists(memberId, LocalDateTime.now().toLocalDate()))
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Til til = new Til(member, req.getContext(), req.getDate());
        return tilRepository.save(til);
    }

    @Transactional
    public void update(TilUpdateRequestDto req, Long tilId, String memberId) {
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if (!til.getMember().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
        til.update(req);
    }

    @Transactional
    public void delete(Long tilId, String memberId) {
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if (!til.getMember().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
        til.delete();
    }

    public TilResponseDto find(Long tilId){
        Til til = tilRepository.findById(tilId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
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
}
