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

    // 전체 유저를 가져오..긴 하는데 검색 조건을 줄 수는 있음 필요하면 구현할께..
//    @GetMapping("/member")
//    public ResponseEntity allMember(){
//
//    }

    private final KeywordService keywordService;

    @PostMapping("/keyword")
    public ResponseEntity createKeyword(@RequestBody KeywordRequestDto req){
        return new ResponseEntity<Long>(keywordService.create(req).getId(), HttpStatus.OK);
    }

    @PatchMapping("/keyword/{keywordId}")
    public ResponseEntity updateKeyword(@RequestBody KeywordRequestDto req, @PathVariable Long keywordId){
        keywordService.update(req, keywordId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PatchMapping("/keyword/{keywordId}/delete")
    public ResponseEntity deleteKeyword(@PathVariable Long keywordId){
        keywordService.delete(keywordId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
