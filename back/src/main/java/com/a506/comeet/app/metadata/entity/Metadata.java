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

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Metadata extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 멤버아이디 방아이디 입장시간 퇴장시간 키워드
    private String context;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    @Builder
    public Metadata(String context, Member member, Room room) {
        this.context = context;
        this.member = member;
        this.room = room;
    }
}
