package com.a506.comeet.app.member.service;

import com.a506.comeet.app.board.entity.Board;
import com.a506.comeet.app.board.repository.BoardRepository;
import com.a506.comeet.app.member.entity.Like;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.LikeRepository;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LikeService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final LikeRepository likeRepository;

    @Transactional
    public void addLike(Long boardId, String memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        Like like = new Like(board, member);
        likeRepository.save(like);
    }

    @Transactional
    public void removeLike(Long boardId, String memberId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_BOARD));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        Like like = likeRepository.findByBoardAndMember(board, member).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND, "해당 게시글에 대한 좋아요가 존재하지 않습니다"));
        likeRepository.delete(like);
    }
}