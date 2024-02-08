package com.a506.comeet.app.room.controller;

import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@Slf4j
public class RoomController {

    private final RoomService roomService;
    private final S3UploadService s3UploadService;

    @PostMapping("")
    public ResponseEntity<Long> create(@Valid @RequestBody RoomCreateRequestDto req) {
        String memberId = MemberUtil.getMemberId();
        Room created = roomService.create(req, memberId);
        req.setManagerId(memberId);
        return ResponseEntity.ok(created.getId());
    }

    @PatchMapping("/{roomId}")
    public ResponseEntity<Void> update(@Valid @RequestBody RoomUpdateRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.update(req, memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/image")
    public ResponseEntity<?> getImageUrl(
            @RequestParam("roomImageFile") MultipartFile multipartFile) {
        log.info("roomImageFile : {}", multipartFile);
        try{
            String url = s3UploadService.saveFile(multipartFile, "roomImage/");
            log.info("url : {}", url);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "이미지 파일 업로드 중 에러가 발생하였습니다");
        }
    }

    @DeleteMapping("/image")
    public ResponseEntity<?> deleteImageUrl(
            @RequestParam("roomImageUrl") String roomImageUrl) {
        s3UploadService.deleteImage(roomImageUrl, "roomImage/");
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> delete(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.delete(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/join/{roomId}")
    public ResponseEntity<Void> join(@Valid @RequestBody RoomJoinRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.join(req, memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/join/{roomId}")
    public ResponseEntity<Void> withdraw(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        roomService.withdraw(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("")
    public ResponseEntity<Slice<RoomSearchResponseDto>> search(@Valid RoomSearchRequestDto req, @PageableDefault(size = 20) Pageable pageable) {
        Slice<RoomSearchResponseDto> res = roomService.search(req, pageable);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{roomId}/enter")
    public ResponseEntity<RoomResponseDto> enter(@RequestBody RoomEnterRequestDto req, @PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        RoomResponseDto res = roomService.enter(req, roomId, memberId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{roomId}/enter")
    public ResponseEntity<Void> leave(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        String metadataId = roomService.leave(roomId, memberId);
        log.info("메타데이터 생성 : {}",metadataId);
        return ResponseEntity.ok().build();
    }


}
