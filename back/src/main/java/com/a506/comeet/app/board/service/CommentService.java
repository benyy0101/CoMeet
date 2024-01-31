package com.a506.comeet.app.board.service;

import com.a506.comeet.app.board.controller.dto.CommentCreateRequestDto;
import com.a506.comeet.app.board.controller.dto.CommentUpdateRequestDto;
import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.entity.Comment;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.board.repository.CommentRepository;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
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

        Board board = boardRepository.findById(req.getBoardId()).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Comment comment = Comment.builder()
                .board(board)
                .writer(member)
                .content(req.getContent())
                .build();

        return commentRepository.save(comment);
    }

    @Transactional
    public Comment update(CommentUpdateRequestDto req, Long commentId, String memberId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(comment, memberId);
        comment.update(req);
        return comment;
    }

    @Transactional
    public void delete(Long commentId, String memberId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        authorityValidation(comment, memberId);
        comment.delete();
    }

    public void authorityValidation(Comment comment, String memberId) {
        if (!comment.getWriter().getMemberId().equals(memberId))
            throw new RestApiException(CustomErrorCode.NO_AUTHORIZATION);
    }
}
