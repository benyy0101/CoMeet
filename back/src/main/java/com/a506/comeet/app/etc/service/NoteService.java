package com.a506.comeet.app.etc.service;

import com.a506.comeet.app.etc.controller.dto.NoteCreateRequestDto;
import com.a506.comeet.app.etc.controller.dto.NoteResponseDto;
import com.a506.comeet.app.etc.entity.Note;
import com.a506.comeet.app.etc.repository.NoteRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class NoteService {

    private final NoteRepository noteRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public Note create(NoteCreateRequestDto req, String memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "송신자가 존재하지 않습니다"));
        Member receiver = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "수신자가 존재하지 않습니다"));
        Note note = Note.builder()
                .writer(writer)
                .receiver(receiver)
                .context(req.getContext()).
                isRead(false)
                .build();
        return noteRepository.save(note);
    }

    @Transactional
    public void delete(Long noteId, String memberId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_NOTE));
        authorityValidation(memberId, note);
        note.delete();
    }

//    public List<NoteSimpleResponseDto>

    @Transactional
    public NoteResponseDto findAndRead(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_NOTE));
        note.read();
        return NoteResponseDto.builder()
                .id(note.getId())
                .writerId(note.getWriter().getMemberId())
                .receiverId(note.getReceiver().getMemberId())
                .context(note.getContext())
                .isRead(note.getIsRead())
                .createdAt(note.getCreatedAt())
                .build();
    }


    private void authorityValidation(String memberId, Note note) {
        if (!note.getWriter().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "쪽지 작성자가 아닙니다");
    }
}
