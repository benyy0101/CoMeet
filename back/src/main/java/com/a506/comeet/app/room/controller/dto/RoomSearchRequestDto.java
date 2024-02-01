package com.a506.comeet.app.room.controller.dto;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomOrder;
import com.a506.comeet.common.enums.RoomSortBy;
import com.a506.comeet.common.enums.RoomType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class RoomSearchRequestDto {
    private String searchKeyword;
    private Boolean isLocked;
    private Integer minMcount;
    private Integer maxMcount;
    private Integer minCapacity;
    private Integer maxCapacity;
    private List<Long> keywordIds;
    private List<RoomConstraints> constraints;
    @Builder.Default
    private RoomType type = RoomType.DISPOSABLE;
    private RoomSortBy sortBy;
    private Boolean isDesc;
    @NotNull
    private Integer pageNo;
    @NotNull
    private Integer pageSize;
    private Long prevRoomId;
}
