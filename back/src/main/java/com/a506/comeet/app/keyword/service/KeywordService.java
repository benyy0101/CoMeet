package com.a506.comeet.app.keyword.service;

import com.a506.comeet.admin.controller.dto.KeywordRequestDto;
import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.repository.RoomKeywordRepository;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final RoomKeywordRepository roomKeywordRepository;

    @Transactional
    public Keyword create(KeywordRequestDto req){
        Keyword keyword = new Keyword(req.getName());
        return keywordRepository.save(keyword);
    }

    @Transactional
    public void update(KeywordRequestDto req, Long keywordId){
        Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_KEYWORD));
        keyword.setName(req.getName());
    }

    @Transactional
    public void delete(Long keywordId){
        Keyword keyword = keywordRepository.findById(keywordId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_KEYWORD));
        keyword.delete();
        roomKeywordRepository.deleteAll();
    }

    public List<KeywordResponseDto> getAll() {
        return keywordRepository.findAll().stream().map(m -> new KeywordResponseDto(m.getId(), m.getName())).toList();
    }
}
