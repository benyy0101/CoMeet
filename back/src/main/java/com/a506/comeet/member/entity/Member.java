package com.a506.comeet.member.entity;

import com.a506.comeet.member.controller.MemberUpdateRequestDto;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.room.entity.Room;
import com.a506.comeet.room.entity.RoomMember;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

/**
 * 미완성
 */

@Entity
@Getter
public class Member extends BaseEntityWithSoftDelete {

    @Id
    @Column(name="member_id")
    private String memberId;
    private String name;
    private String password;
    private String nickname;
    private String link;
    @Column(name = "profile_image")
    private String profileImage;
    private String email;
    private String description;
    private String authority;
    private String feature;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RoomMember> roomMembers = new ArrayList<>();

    @Builder
    public Member(String memberId, String name, String password, String nickname, String email) {
        this.memberId = memberId;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }

    protected Member(){
    }

    public void updateUser(MemberUpdateRequestDto dto){
        this.name = dto.getName();
        this.password = dto.getPassword();
        this.nickname = dto.getNickname();
        this.link = dto.getLink();
        this.profileImage = dto.getProfileImage();
        this.email = dto.getProfileImage();
        this.description = dto.getDescription();
        this.feature = dto.getFeature();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().memberId) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
    }


}
