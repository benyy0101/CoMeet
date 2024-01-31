package com.a506.comeet.app.metadata.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MetadataDto {
    private Long roomId;
    private LocalDateTime enterTime;
    private LocalDateTime leaveTime;
    private String keywords;
}
