package com.a506.comeet.app.member.controller;

import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.service.MemberService;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<?> getImageUrl(
            @RequestParam("profileImageFile") MultipartFile multipartFile) {
        log.info("profileImageFile : {}", multipartFile);
        try{
            String url = s3UploadService.saveFile(multipartFile, "profileImage/");
            log.info("url : {}", url);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "이미지 파일 업로드 중 에러가 발생하였습니다");
        }
    }

    @DeleteMapping("/image")
    public ResponseEntity<?> deleteImageUrl(
            @RequestParam("profileImageUrl") String profileImageUrl) {
        s3UploadService.deleteImage(profileImageUrl, "profileImage/");
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
