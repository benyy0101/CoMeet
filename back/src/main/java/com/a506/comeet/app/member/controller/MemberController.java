package com.a506.comeet.app.member.controller;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.service.MemberService;
import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final S3UploadService s3UploadService;

    @PostMapping("")
    public ResponseEntity<String> signup(@RequestBody @Valid MemberSigninRequestDto req){
        req.setRoles(List.of("USER"));
        Member created = memberService.create(req);
        return ResponseEntity.ok(created.getMemberId());
    }

    @PatchMapping("")
    public ResponseEntity<Void> update(@Valid @RequestBody MemberUpdateRequestDto req) {
        String memberId = MemberUtil.getMemberId();
        memberService.update(req, memberId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/image")
    public ResponseEntity<Void> updateImage(
            @RequestParam("profileImageFile") MultipartFile multipartFile) {
        String memberId = MemberUtil.getMemberId();
        String url = s3UploadService.saveFile(multipartFile, "profileImage/");
        log.info("created url: {}", url);
        memberService.update(MemberUpdateRequestDto
                .builder()
                .profileImage(url)
                .build(), memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/image")
    public ResponseEntity<Void> deleteImage() {
        String memberId = MemberUtil.getMemberId();
        memberService.update(MemberUpdateRequestDto
                .builder()
                .profileImage("")
                .build(), memberId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(){
        String memberId = MemberUtil.getMemberId();
        memberService.delete(memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> duplicationValidate(@Valid MemberDuplicationRequestDto req){
        if(req.isAllNull()) throw new RestApiException(CommonErrorCode.WRONG_REQUEST);
        return ResponseEntity.ok(memberService.duplicationValid(req));
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetailResponseDto> get(@PathVariable String memberId){
        return ResponseEntity.ok(memberService.getMemberDetail(memberId));
    }

}
