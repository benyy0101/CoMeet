package com.a506.comeet.app.etc.controller;

import com.a506.comeet.app.etc.controller.dto.NoteCreateRequestDto;
import com.a506.comeet.app.etc.controller.dto.NoteResponseDto;
import com.a506.comeet.app.etc.controller.dto.NoteSimpleResponseDto;
import com.a506.comeet.app.etc.entity.Note;
import com.a506.comeet.app.etc.service.NoteService;
import com.a506.comeet.common.util.MemberUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/note")
@RequiredArgsConstructor
@Slf4j
public class NoteController {

    private final NoteService noteService;

    @PostMapping("")
    public ResponseEntity<Long> create(@RequestBody @Valid NoteCreateRequestDto req){
        String memberId = MemberUtil.getMemberId();
        Note created = noteService.create(req, memberId);
        return ResponseEntity.ok(created.getId());
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResponseDto> findAndRead(@PathVariable Long noteId){
        String memberId = MemberUtil.getMemberId();
        return ResponseEntity.ok(noteService.findAndRead(noteId, memberId));
    }

    @GetMapping("")
    public ResponseEntity<Page<NoteSimpleResponseDto>> getList(@PageableDefault(size = 20) Pageable pageable){
        String memberId = MemberUtil.getMemberId();
        return ResponseEntity.ok(noteService.findList(memberId, pageable));
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> delete(@PathVariable Long noteId){
        String memberId = MemberUtil.getMemberId();
        noteService.delete(noteId, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join-request/{roomId}")
    public ResponseEntity<Void> joinRequest(@PathVariable Long roomId){
        String memberId = MemberUtil.getMemberId();
        noteService.sendJoinNote(roomId, memberId);
        return ResponseEntity.ok().build();
    }
}
