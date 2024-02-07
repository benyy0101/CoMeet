package com.a506.comeet.app.etc.controller;

import com.a506.comeet.app.etc.controller.dto.NoteCreateRequestDto;
import com.a506.comeet.app.etc.controller.dto.NoteResponseDto;
import com.a506.comeet.app.etc.entity.Note;
import com.a506.comeet.app.etc.service.NoteService;
import com.a506.comeet.app.member.MemberUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        return ResponseEntity.ok(noteService.findAndRead(noteId));
    }

//    @GetMapping("/list/{memberId}")
//    public ResponseEntity<List<NoteResponseDto>> getList(@Valid Notr req, @PathVariable String memberId){
//        return ResponseEntity.ok(noteService.findList(req, memberId));
//    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> delete(@PathVariable Long noteId){
        String memberId = MemberUtil.getMemberId();
        noteService.delete(noteId, memberId);
        return ResponseEntity.ok().build();
    }


}
