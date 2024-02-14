package com.a506.comeet.app.room.controller;

import com.a506.comeet.app.room.controller.dto.*;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.service.RoomService;
import com.a506.comeet.common.util.MemberUtil;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
@Slf4j
public class RoomController {

    private final RoomService roomService;
    private final S3UploadService s3UploadService;

    @PostMapping("")
    public ResponseEntity<RoomSimpleResponseDto> create(@Valid @RequestBody RoomCreateRequestDto req) {
        String memberId = MemberUtil.getMemberId();
        req.setManagerId(memberId);
        Room created = roomService.create(req, memberId);
        RoomSimpleResponseDto res = new RoomSimpleResponseDto(created.getId(), created.getTitle(), created.getRoomImage());
        return ResponseEntity.ok(res);
    }

    @PatchMapping("/{roomId}")
    public ResponseEntity<Void> update(@Valid @RequestBody RoomUpdateRequestDto req, @PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();

        try {
            roomService.update(req, memberId, roomId);
        } catch (DataIntegrityViolationException e) {
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "이미 존재하는 방 이름입니다");
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/image/{roomId}")
    public ResponseEntity<Void> updateImage(
            @RequestParam("roomImageFile") MultipartFile multipartFile, @PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        String url = s3UploadService.saveFile(multipartFile, "roomImage/");
        log.info("url : {}", url);

        roomService.update(RoomUpdateRequestDto
                .builder()
                .roomImage(url)
                .build(), memberId, roomId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/image/{roomId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        roomService.update(RoomUpdateRequestDto
                .builder()
                .roomImage("")
                .build(), memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> delete(@PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        roomService.delete(memberId, roomId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/join/{roomId}")
    public ResponseEntity<Void> join(@Valid @RequestBody RoomJoinRequestDto req, @PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        roomService.join(req, memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/join/{roomId}")
    public ResponseEntity<Void> withdraw(@PathVariable Long roomId) {
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
    public ResponseEntity<RoomResponseDto> enter(@RequestBody RoomEnterRequestDto req, @PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        RoomResponseDto res = roomService.enter(req, roomId, memberId);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{roomId}/enter")
    public ResponseEntity<Void> leave(@PathVariable Long roomId) {
        String memberId = MemberUtil.getMemberId();
        String metadataId = roomService.leave(roomId, memberId);
        log.info("메타데이터 생성 : {}", metadataId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponseDto> getDetails(@PathVariable Long roomId) {
        RoomResponseDto res = roomService.getDetails(roomId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/managing")
    public ResponseEntity<List<ManagingRoomResponseDto>> getMyManagerRoom() {
        String memberId = MemberUtil.getMemberId();
        return ResponseEntity.ok(roomService.getManagingRoom(memberId));
    }

}
