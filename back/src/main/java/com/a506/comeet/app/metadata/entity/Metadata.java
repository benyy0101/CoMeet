package com.a506.comeet.app.metadata.entity;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Metadata extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private LocalDateTime enterTime;
    private LocalDateTime leaveTime;
    private String keywords;

    @Builder
    public Metadata(Member member, Room room, LocalDateTime enterTime, LocalDateTime leaveTime, String keywords) {
        this.member = member;
        this.room = room;
        this.enterTime = enterTime;
        this.leaveTime = leaveTime;
        this.keywords = keywords;
    }
}
