package com.a506.comeet.app.etc.service;

import com.a506.comeet.app.etc.controller.dto.NoteCreateRequestDto;
import com.a506.comeet.app.etc.controller.dto.NoteResponseDto;
import com.a506.comeet.app.etc.controller.dto.NoteSimpleResponseDto;
import com.a506.comeet.app.etc.entity.Note;
import com.a506.comeet.app.etc.repository.NoteRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class NoteService {

    private final NoteRepository noteRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    @Transactional
    public Note create(NoteCreateRequestDto req, String memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "송신자가 존재하지 않습니다"));
        Member receiver = memberRepository.findById(req.getReceiverId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "수신자가 존재하지 않습니다"));
        Note note = Note.builder()
                .writer(writer)
                .receiver(receiver)
                .context(req.getContext())
                .isRead(false)
                .build();
        return noteRepository.save(note);
    }

    @Transactional
    public void delete(Long noteId, String memberId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_NOTE));
        writerAuthorityValidation(memberId, note);
        note.delete();
    }

    @Transactional
    public NoteResponseDto findAndRead(Long noteId, String memberId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_NOTE));
        readerAuthorityValidation(memberId, note);
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


    private void writerAuthorityValidation(String memberId, Note note) {
        if (!note.getWriter().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "쪽지 작성자가 아닙니다");
    }


    private void readerAuthorityValidation(String memberId, Note note) {
        if (!note.getWriter().getMemberId().equals(memberId)) throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "쪽지 수신자가 아니어서 읽을 수 없습니다");
    }

    public Page<NoteSimpleResponseDto> findList(String memberId, Pageable pageable) {
        return noteRepository.getNoteList(memberId, pageable);
    }

    @Transactional
    public void sendJoinNote(Long roomId, String memberId) {
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER, "송신자가 존재하지 않습니다"));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_ROOM));
        Member receiver = room.getManager();

        roomTypeValidation(room);
        alreadyJoinedValidation(room, writer);

        Note note = Note.builder()
                .writer(writer)
                .receiver(receiver)
                .context(createContext(room, writer))
                .isRead(false)
                .build();
        noteRepository.save(note);
    }

    private void roomTypeValidation(Room room) {
        if (room.getType().equals(RoomType.DISPOSABLE))
            throw new RestApiException(CommonErrorCode.WRONG_REQUEST, "일회용 방으로 가입할 수 없습니다");
    }

    private void alreadyJoinedValidation(Room room, Member member) {
        if (roomMemberRepository.existsByRoomAndMember(room, member)) // 최적화 가능
            throw new RestApiException(CustomErrorCode.DUPLICATE_VALUE, "이미 방에 가입되어있습니다");
    }

    private String createContext(Room room, Member writer){
        return writer.getNickname() + "님이 " + room.getTitle() + " 방에 가입 요청을 보냈습니다! " +
                room.getId();
    }
}
