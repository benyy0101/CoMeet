package com.a506.comeet.metadata.entity;

import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
@Document(collection = "metadata")
public class Metadata extends BaseEntity {

    @Id
    private String id;
    private String memberId;
    private Long roomId;
    private LocalDateTime enterTime;
    private LocalDateTime leaveTime;
    private String keywords;

    @Builder
    public Metadata(String memberId, Long roomId, LocalDateTime enterTime, LocalDateTime leaveTime, String keywords) {
        this.memberId = memberId;
        this.roomId = roomId;
        this.enterTime = enterTime;
        this.leaveTime = leaveTime;
        this.keywords = keywords;
    }
}
