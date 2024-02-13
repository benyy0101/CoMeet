package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.CommentSearchResponseDto;
import com.a506.comeet.app.board.controller.dto.CommentUpdateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.entity.Comment;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.board.repository.CommentRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Comment create(CommentCreateRequestDto req, String memberId){
        Board board = boardRepository.findById(req.getBoardId()).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));

        Comment comment = Comment.builder()
                .board(board)
                .writer(member)
                .content(req.getContent())
                .build();

        return commentRepository.save(comment);
    }

    @Transactional
    public void update(CommentUpdateRequestDto req, Long commentId, String memberId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_COMMENT));
        authorityValidation(comment, memberId);
        comment.update(req);
    }

    @Transactional
    public void delete(Long commentId, String memberId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_COMMENT));
        authorityValidation(comment, memberId);
        comment.delete();
    }

    public Page<CommentSearchResponseDto> search(Long boardId, Pageable pageable) {
        Page<Comment> comments = commentRepository.findByBoardId(boardId, pageable);
        return comments.map(CommentSearchResponseDto::toCommentSearchResponseDto);
    }

    public void authorityValidation(Comment comment, String memberId) {
        if (!comment.getWriter().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION, "댓글 작성자가 아닙니다");
    }
}