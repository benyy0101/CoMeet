package com.a506.comeet.member.controller;

import com.a506.comeet.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PostMapping("")
    public ResponseEntity signup(@RequestBody @Valid MemberSigninRequestDto req){
        Member created = memberService.create(req);
        if (created == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<String>(created.getMemberId(), HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @PatchMapping("")
    public ResponseEntity<Void> update(@Valid @RequestBody MemberUpdateRequestDto req){
        // 요청자 정보 가져오기
        String memberId = "요청자";
        if (!memberService.update(req, memberId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/delete")
    public ResponseEntity<Void> delete(@PathVariable long roomId){
        // 요청자 정보 가져오기
        String memberId = "요청자";
        if(!memberService.delete(memberId))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check")
    public ResponseEntity<?> duplicationValidate(@RequestBody MemberDuplicationRequestDto req){
        if(req.isAllNull()) return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Boolean>(memberService.duplicationValid(req),HttpStatus.OK);
    }

}
