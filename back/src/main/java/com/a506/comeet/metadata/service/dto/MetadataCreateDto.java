package com.a506.comeet.metadata.service.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MetadataCreateDto {
    private String memberId;
    private Long roomId;
    private LocalDateTime enterTime;
    private LocalDateTime leaveTime;
    private String keywords;

    @Builder
    public MetadataCreateDto(String memberId, Long roomId, LocalDateTime enterTime, LocalDateTime leaveTime, String keywords) {
        this.memberId = memberId;
        this.roomId = roomId;
        this.enterTime = enterTime;
        this.leaveTime = leaveTime;
        this.keywords = keywords;
    }
}
