package com.a506.comeet.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    // 전체 유저를 가져오..긴 하는데 검색 조건을 줄 수는 있음 필요하면 구현할께..
//    @GetMapping("/member")
//    public ResponseEntity allMember(){
//
//    }
}
