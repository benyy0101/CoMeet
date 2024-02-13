package com.a506.comeet.admin.controller;

import com.a506.comeet.admin.controller.dto.KeywordRequestDto;
import com.a506.comeet.app.keyword.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final KeywordService keywordService;

    @PostMapping("/keyword")
    public ResponseEntity<?> create(@RequestBody KeywordRequestDto req){
        return ResponseEntity.ok(keywordService.create(req).getId());
    }

    @PatchMapping("/keyword/{keywordId}")
    public ResponseEntity<?> update(@RequestBody KeywordRequestDto req, @PathVariable Long keywordId){
        keywordService.update(req, keywordId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/keyword/{keywordId}")
    public ResponseEntity<?> delete(@PathVariable Long keywordId){
        keywordService.delete(keywordId);
        return ResponseEntity.ok().build();
    }

}
