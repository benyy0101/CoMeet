package com.a506.comeet.app.room.controller.dto;


import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
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
    private Boolean isLocked;
    private String password;
    private RoomConstraints constraints;
    private RoomType type;
    @Setter
    private List<RoomMemberResponseDto> members;
    @Setter
    private List<RoomChannelResponseDto> channels;
    @Setter
    private List<RoomLoungeResponseDto> lounges;

    public RoomResponseDto(Long roomId, String managerId, String managerNickname, String description, String link, String room_image, String notice, int mcount, int capacity, Boolean isLocked, String password, RoomConstraints constraints, RoomType type) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.description = description;
        this.link = link;
        this.room_image = room_image;
        this.notice = notice;
        this.mcount = mcount;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
    }

    public RoomResponseDto(Long roomId, String managerId, String managerNickname, String description, String link, String room_image, String notice, int mcount, int capacity, Boolean isLocked, String password, RoomConstraints constraints, RoomType type, List<RoomMemberResponseDto> members, List<RoomChannelResponseDto> channels, List<RoomLoungeResponseDto> lounges) {
        this.roomId = roomId;
        this.managerId = managerId;
        this.managerNickname = managerNickname;
        this.description = description;
        this.link = link;
        this.room_image = room_image;
        this.notice = notice;
        this.mcount = mcount;
        this.capacity = capacity;
        this.isLocked = isLocked;
        this.password = password;
        this.constraints = constraints;
        this.type = type;
        this.members = members;
        this.channels = channels;
        this.lounges = lounges;
    }
}
