package com.a506.comeet.app.keyword.controller;

import com.a506.comeet.app.keyword.repository.KeywordRepository;
import com.a506.comeet.app.keyword.service.KeywordService;
import com.a506.comeet.app.keyword.entity.Keyword;
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

    @GetMapping("")
    public ResponseEntity<List<KeywordResponseDto>> getList(){
        return ResponseEntity.ok(keywordService.getAll());
    }

}
