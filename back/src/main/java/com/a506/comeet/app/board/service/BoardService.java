package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.*;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.LikeRepository;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.LikeService;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

import static com.a506.comeet.error.errorcode.CustomErrorCode.*;

@Slf4j
@Service
@Validated
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final LikeRepository likeRepository;
    private final LikeService likeService;

    @Transactional
    public Board create(BoardCreateRequestDto req, String memberId) {

        checkBoardStatus(req.getType(), req.getRoomId(), req.getCategory());

        Room room = null;
        if(req.getType().equals(BoardType.RECRUIT)){
            if(boardRepository.existsByRoomId(req.getRoomId()))
                throw new RestApiException(DUPLICATE_VALUE, "해당 방이 이미 게시되어 있습니다.");
            room = roomRepository.findById(req.getRoomId()).orElseThrow(() -> new RestApiException(NO_ROOM));
        }

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));

        Board board = Board.builder()
                .writer(member)
                .title(req.getTitle())
                .content(req.getContent())
                .type(req.getType())
                .likeCount(req.getLikeCount())
                .category(req.getCategory())
                .room(room)
                .isValid(req.getIsValid())
                .build();

        return boardRepository.save(board);
    }

    @Transactional
    public Board update(BoardUpdateRequestDto req, Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        authorityValidation(board, memberId);
        board.update(req);
        return board;
    }

    @Transactional
    public void delete(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        authorityValidation(board, memberId);
        board.delete();
    }

    public Page<BoardListResponseDto> search(BoardListRequestDto req, Pageable pageable) {
        return boardRepository.searchBoardCustom(req, pageable);
    }

    public BoardDetailResponseDto getById(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));

        boolean isLike = checkLikeStatus(boardId, memberId);
        return BoardDetailResponseDto.toBoardSearchResponseDto(board, board.getRoom(), getKeywords(board.getRoom()), isLike);
    }

    @Transactional
    public void addLike(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        if (!checkLikeStatus(boardId, memberId)) {
            likeService.addLike(boardId, memberId);
            board.incrementLikeCount();
        }
    }

    @Transactional
    public void removeLike(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        if (checkLikeStatus(boardId, memberId)) {
            likeService.removeLike(boardId, memberId);
            board.decrementLikeCount();
        }
    }

    public void authorityValidation(Board board, String memberId) {
        if (!board.getWriter().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "게시글 작성자가 아닙니다");
    }

    public Boolean checkLikeStatus(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        return likeRepository.existsByBoardAndMember(board, member);
    }

    public void checkBoardStatus(BoardType type, Long RoomId, FreeBoardCategory category){
        if(type.equals(BoardType.RECRUIT)){
            if (RoomId == null)
                throw new RestApiException(NO_ROOM, "모집 게시판은 방이 존재해야 합니다.");
            if(category != null)
                throw new RestApiException(YES_CATEGORY, "모집 게시판은 카테고리가 존재하지 않아야 합니다.");
        } else {
            if(RoomId != null)
                throw new RestApiException(YES_ROOM, "자유 게시판은 방이 존재하지 않아야 합니다.");
        }
    }

    private List<KeywordResponseDto> getKeywords(Room room){
        List<KeywordResponseDto> keywords = new ArrayList<>();
        if(room != null) {
            if (room.getRoomKeywords() == null)
                return null;
            for (RoomKeyword roomKeyword : room.getRoomKeywords()) {
                keywords.add(new KeywordResponseDto(roomKeyword.getKeyword().getId(), roomKeyword.getKeyword().getName()));
            }
        }
        return keywords;
    }
}