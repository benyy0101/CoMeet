package com.a506.comeet.app.member.controller.dto;

import com.a506.comeet.app.keyword.controller.KeywordResponseDto;
import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.member.StudyHour;
import com.a506.comeet.app.metadata.entity.Metadata;
import com.a506.comeet.common.enums.MemberFeature;
import lombok.Getter;

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
    // metadata 관련
    private Double dayStudyHour;
    private Double weekStudyHour;
    private Double monthStudyHour;
    private StudyHour studyHour;
    // 키워드 관련
    private List<KeywordResponseDto> keywords;


    public MemberDetailResponseDto(String memberId, String name, String nickname, String link, String profileImage, String email, String description, MemberFeature feature) {
        this.memberId = memberId;
        this.name = name;
        this.nickname = nickname;
        this.link = link;
        this.profileImage = profileImage;
        this.email = email;
        this.description = description;
        this.feature = feature;
    }
}
