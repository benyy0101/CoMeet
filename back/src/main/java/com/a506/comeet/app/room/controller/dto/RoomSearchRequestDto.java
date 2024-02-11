package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomSortBy;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoomSearchRequestDto {
    private String searchKeyword;
    private String managerNickname;
    private Boolean isLocked;
    private List<Long> keywordIds;
    private List<RoomConstraints> constraints;
    private RoomSortBy sortBy;

    @Builder
    public RoomSearchRequestDto(String searchKeyword, String managerNickname, Boolean isLocked, List<Long> keywordIds, List<RoomConstraints> constraints, RoomSortBy sortBy, Long prevRoomId) {
        this.searchKeyword = searchKeyword;
        this.managerNickname = managerNickname;
        this.isLocked = isLocked;
        this.keywordIds = keywordIds;
        this.constraints = constraints;
        this.sortBy = sortBy;
    }
}