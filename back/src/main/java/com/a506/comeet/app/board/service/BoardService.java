package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.*;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.LikeRepository;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.member.service.LikeService;
import com.a506.comeet.app.room.controller.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomSearchResponseDto;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import static com.a506.comeet.error.errorcode.CommonErrorCode.WRONG_REQUEST;

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

        Room room = null;
        if(req.getRoomId() != null)
            room = roomRepository.findById(req.getRoomId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

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
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(board, memberId);
        board.update(req);
        return board;
    }

    @Transactional
    public void delete(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(board, memberId);
        board.delete();
    }

    public Page<BoardListResponseDto> search(BoardListRequestDto req, Pageable pageable) {
        return boardRepository.searchBoardCustom(req, pageable);
    }

    public BoardDetailResponseDto getById(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        //모집 게시판은 방이 있어야 하고, 자유 게시판은 방이 없어야 한다.
        if(board.getType().equals(BoardType.RECRUIT)){
            if(board.getRoom() == null)
                throw new RestApiException(WRONG_REQUEST);
        } else{
            if(board.getRoom() != null)
                throw new RestApiException(WRONG_REQUEST);
        }

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        StringBuilder keywordsString = new StringBuilder();
        if(board.getRoom() != null) {
            if (board.getRoom().getRoomKeywords() == null)
                return null;
            for (RoomKeyword roomKeyword : board.getRoom().getRoomKeywords()) {
                if (!keywordsString.isEmpty()) {
                    keywordsString.append(", ");
                }
                keywordsString.append(roomKeyword.getKeyword());
            }
        }
        boolean isLike = checkLikeStatus(boardId, memberId);
        return BoardDetailResponseDto.toBoardSearchResponseDto(board, board.getRoom(), member, keywordsString.toString(), isLike);
    }

    @Transactional
    public void addLike(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if(!checkLikeStatus(boardId, memberId)){
            likeService.addLike(boardId, memberId);
            board.incrementLikeCount();
        }
    }

    @Transactional
    public void removeLike(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        if(checkLikeStatus(boardId, memberId)){
            likeService.removeLike(boardId, memberId);
            board.decrementLikeCount();
        }
    }

    public void authorityValidation(Board board, String memberId) {
        if (!board.getWriter().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
    }

    public boolean checkLikeStatus(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        return likeRepository.existsByBoardAndMember(board, member);
    }
}