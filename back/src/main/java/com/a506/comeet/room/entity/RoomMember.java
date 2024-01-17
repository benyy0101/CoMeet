package com.a506.comeet.room.entity;

import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMemberId;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class RoomMember {

    @EmbeddedId
    private RoomMemberId id;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne
    @MapsId("roomId")
    @JoinColumn(name="room_id")
    private Room room;

    protected RoomMember(){

    }

    public RoomMember(Member member, Room room) {
        setId(member, room);
        this.member = member;
        this.room = room;
    }

    public void setId(Member member, Room room){
        this.id = new RoomMemberId(member.getMemberId(), room.getId());
    }


    public void joinRoom(){
        this.member.addRoomMember(this);
        this.room.addRoomMember(this);
    }

    public void leaveRoom(){
        this.member.removeRoomMember(this);
        this.room.removeRoomMember(this);
    }
}