package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.app.member.controller.dto.MemberSimpleResponseDto;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoomResponseDto {

    private Long roomId;
    private String managerId;
    private String managerNickname;
    private String title;
    private String description;
    private String room_image;
    private String notice;
    private Integer mcount;
    private Integer capacity;
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    private RoomType type;
    @Setter
    private Integer currentMcount;
    @Setter
    private List<RoomMemberResponseDto> members = new ArrayList<>();
    @Setter
    private List<MemberSimpleResponseDto> currentMembers = new ArrayList<>();
    @Setter
    private List<RoomChannelResponseDto> channels = new ArrayList<>();
    @Setter
    private List<RoomLoungeResponseDto> lounges = new ArrayList<>();
    @Setter
    private List<RoomKeywordResponseDto> keywords = new ArrayList<>();

    public RoomResponseDto(Long roomId, String managerId, String managerNickname, String title, String description, String room_image, String notice, Integer mcount, Integer capacity, Boolean isLocked, String password, RoomConstraints constraints, RoomType type) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.title = title;
        this.description = description;
        this.room_image = room_image;
        this.notice = notice;
        this.mcount = mcount;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
    }
}
