package com.a506.comeet.app.room.entity;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.controller.dto.RoomUpdateRequestDto;
import com.a506.comeet.common.BaseEntity;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import jakarta.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")

public class Room extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Member manager;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Lounge> lounges = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Channel> channels = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomMember> roomMembers = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomKeyword> roomKeywords = new ArrayList<>();

    @Column(unique = true)
    private String title;

    private String description;
    @Column(name = "room_image")
    private String roomImage = "";
    private String notice;

    private int mcount;
    private int capacity = 8;
    @Column(name = "is_locked")
    private Boolean isLocked = Boolean.FALSE;
    private String password;

    @Enumerated(EnumType.STRING)
    private RoomConstraints constraints;
    @Enumerated(EnumType.STRING)
    private RoomType type;

    @Builder
    public Room(Member manager, String title, String description, int capacity, RoomConstraints constraints, RoomType type) {
        this.manager = manager;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
    }

    public void updateRoom(RoomUpdateRequestDto req, Member newManager) {
        if (newManager != null) this.manager = newManager;
        if (req.getTitle() != null) this.title = req.getTitle();
        if (req.getDescription() != null) this.description = req.getDescription();
        if (req.getRoomImage() != null) this.roomImage = req.getRoomImage();
        if (req.getNotice() != null) this.notice = req.getNotice();
        if (req.getCapacity() != null) this.capacity = req.getCapacity();
        if (req.getIsLocked() != null) this.isLocked = req.getIsLocked();
        if (req.getPassword() != null) this.password = req.getPassword();
        if (req.getConstraints() != null) this.constraints = req.getConstraints();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
        this.mcount = roomMembers.size();
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().getMemberId()) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
        this.mcount = roomMembers.size();
    }

    public void addChannel(Channel channel){
        this.channels.add(channel);
    }

    public void addLounge(Lounge lounge){
        this.lounges.add(lounge);
    }

    public void addKeyword(RoomKeyword roomKeyword){
        this.roomKeywords.add(roomKeyword);
    }

    public void delete(){
        deleteSoftly();
        this.getLounges().forEach(Lounge::deleteSoftly);
        this.getChannels().forEach(Channel::deleteSoftly);
        this.getRoomKeywords().forEach(RoomKeyword::deleteSoftly);
        this.getRoomMembers().forEach(RoomMember::deleteSoftly);
    }
}
