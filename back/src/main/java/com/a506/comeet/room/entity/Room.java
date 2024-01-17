package com.a506.comeet.room.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.RoomUpdateRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Room extends BaseEntityWithSoftDelete {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    @Setter
    private Member manager;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Lounge> lounges = new ArrayList<>();;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Channel> channels = new ArrayList<>();;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomMember> roomMembers = new ArrayList<>();

    private String title;
    private String description;
    private String link;
    @Column(name = "room_image")
    private String roomImage;
    private String notice;
    private int mcount;
    private int capacity;
    @Column(name = "is_locked")
    private boolean isLocked;
    private String password;
    private String constraints;
    private String type;

    protected Room(){
    }

    @Builder
    public Room(Member manager, String title, String description, int capacity, String constraints, String type, String link) {
        this.manager = manager;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
        this.link = link;
    }

    public void updateRoom(RoomUpdateRequestDto dto) {
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.roomImage = dto.getRoomImage();
        this.notice = dto.getNotice();
        this.capacity = dto.getCapacity();
        this.isLocked = dto.isLocked();
        this.password = dto.getPassword();
        this.constraints = dto.getConstraints();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().getMemberId()) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
    }

}
