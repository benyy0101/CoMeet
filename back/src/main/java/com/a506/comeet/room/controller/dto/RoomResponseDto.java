package com.a506.comeet.room.controller.dto;


import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.util.List;

@Getter
public class RoomResponseDto {
    private Long roomId;
    private String managerId;
    private String managerNickname;
    private String description;
    private String link;
    private String room_image;
    private String notice;
    private int mcount;
    private int capacity;
    private String keyword;
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    private RoomType type;
    private List<RoomMemberResponseDto> members;
    private List<RoomChannelResponseDto> channels;
    private List<RoomLoungeResponseDto> lounges;

    @QueryProjection
    public RoomResponseDto(Long roomId, String managerId, String managerNickname, String description, String link, String room_image, String notice, int mcount, int capacity, String keyword, Boolean isLocked, String password, RoomConstraints constraints, RoomType type, List<RoomMemberResponseDto> members, List<RoomChannelResponseDto> channels, List<RoomLoungeResponseDto> lounges) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.description = description;
        this.link = link;
        this.room_image = room_image;
        this.notice = notice;
        this.mcount = mcount;
        this.capacity = capacity;
        this.keyword = keyword;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
        this.members = members;
        this.channels = channels;
        this.lounges = lounges;
    }
}
