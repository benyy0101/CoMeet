package com.a506.comeet.keyword.controller;

import com.a506.comeet.keyword.entity.Keyword;
import com.a506.comeet.keyword.repository.KeywordRepository;
import com.a506.comeet.keyword.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;

    private final KeywordRepository keywordRepository;

    @GetMapping("")
    public ResponseEntity getKeywords(){
        return new ResponseEntity<List<Keyword>>(keywordRepository.findAll(), HttpStatus.OK);
    }

}
