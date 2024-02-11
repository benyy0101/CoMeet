package com.a506.comeet.app.member.service;

import com.a506.comeet.app.member.controller.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.controller.dto.MemberDuplicationRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.error.errorcode.CustomErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.a506.comeet.image.service.S3UploadService;
import com.a506.comeet.metadata.service.MetadataService;
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
    private final MetadataService metadataService;
    private final S3UploadService s3UploadService;

    @Transactional
    public Member create(MemberSigninRequestDto req) {
        Member member = Member.builder()
                .memberId(req.getMemberId())
                .name(req.getName())
                .password(passwordEncoder.encode(req.getPassword()))
                .email(req.getEmail())
                .nickname(req.getNickname())
                .roles(req.roles)
                .build();
        return memberRepository.save(member);
    }

    @Transactional
    public void update(MemberUpdateRequestDto req, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        S3ImageDelete(req, member);
        member.updateMember(req);
    }

    private void S3ImageDelete(MemberUpdateRequestDto req, Member member) {
        if (req.getProfileImage() != null) {
            String imageUrl = member.getProfileImage();
            if (!imageUrl.equals("")) {
                s3UploadService.deleteImage(imageUrl, "profileImage/");
            }
        }
    }

    public boolean duplicationValid(MemberDuplicationRequestDto req) {
        return memberRepository.getMemberDuplicationCount(req) == 0;
    }

    @Transactional
    public void delete(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        member.delete();
        roomMemberRepository.deleteAll(member.getRoomMembers());
    }

    public MemberDetailResponseDto getMemberDetail(String memberId) {
        MemberDetailResponseDto res = memberRepository.getMemberDetail(memberId)
                .orElseThrow(() -> new RestApiException(CustomErrorCode.NO_MEMBER));
        metadataService.calculate(res, memberId);
        return res;
    }
}
