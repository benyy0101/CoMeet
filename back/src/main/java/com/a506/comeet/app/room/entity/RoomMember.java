package com.a506.comeet.app.room.entity;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class RoomMember extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public RoomMember(Member member, Room room) {
        this.member = member;
        this.room = room;
    }

    public void joinRoom(){
        this.member.addRoomMember(this);
        this.room.addRoomMember(this);
    }

    public void leaveRoom(){
        deleteSoftly();
        this.member.removeRoomMember(this);
        this.room.removeRoomMember(this);
    }

}