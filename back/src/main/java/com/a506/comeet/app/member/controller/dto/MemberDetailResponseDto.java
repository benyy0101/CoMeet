package com.a506.comeet.app.member.controller.dto;

import com.a506.comeet.app.member.StudyHour;
import com.a506.comeet.common.enums.MemberFeature;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class MemberDetailResponseDto {
    private String memberId;
    private String name;
    private String nickname;
    private String link;
    private String profileImage;
    private String email;
    private String description;
    private MemberFeature feature;
    // 팔로우 관련
    private Integer followingCount;
    private Integer followerCount;

    // Til 관련
    private List<TilSimpleResponseDto> tils;

    // metadata 관련
    @Setter
    private Double dayStudyHour;
    @Setter
    private Double weekStudyHour;
    @Setter
    private Double monthStudyHour;
    @Setter
    private StudyHour studyHour;
    // 키워드 관련
    @Setter
    private List<MemberKeywordResponseDto> keywords;

    public MemberDetailResponseDto(String memberId, String name, String nickname, String link, String profileImage, String email, String description, MemberFeature feature, List<TilSimpleResponseDto> tils) {
        this.memberId = memberId;
        this.name = name;
        this.nickname = nickname;
        this.link = link;
        this.profileImage = profileImage;
        this.email = email;
        this.description = description;
        this.feature = feature;
        this.tils = tils;
    }
}
