package com.a506.comeet.app.member.service;

import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoomMemberRepository roomMemberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Member create(MemberSigninRequestDto req) {
        Member member = Member.builder().
                memberId(req.getMemberId()).
                name(req.getName()).
                password(passwordEncoder.encode(req.getPassword())). // 비밀번호 인코딩
                email(req.getEmail()).
                nickname(req.getNickname()).
                roles(req.roles).
                build();
        return memberRepository.save(member);
    }

    @Transactional
    public void update(MemberUpdateRequestDto req, String memberId){
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        member.updateMember(req);
    }

    public boolean duplicationValid(MemberDuplicationRequestDto req){
        return memberRepository.memberDuplicationCount(req) == 0;
    }

    @Transactional
    public void delete(String memberId) {
        Member member = memberRepository.findByMemberIdAndIsDeletedFalse(memberId).orElseThrow(() -> new RestApiException(CommonErrorCode.RESOURCE_NOT_FOUND));
        member.delete();
        roomMemberRepository.deleteAll(member.getRoomMembers());
    }
}
