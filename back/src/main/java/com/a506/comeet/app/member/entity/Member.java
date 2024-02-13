package com.a506.comeet.app.member.entity;

import com.a506.comeet.app.etc.entity.Til;
import com.a506.comeet.app.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.app.room.entity.RoomMember;
import com.a506.comeet.common.BaseEntity;
import com.a506.comeet.common.enums.MemberFeature;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PROTECTED;

/**
 * 미완성
 */

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
@SQLRestriction("is_deleted = 0")
public class Member extends BaseEntity implements UserDetails {

    @Id
    @Column(name="member_id", updatable = false, unique = true, nullable = false)
    private String memberId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String nickname;
    @Builder.Default
    private String link = "";
    @Column(name = "profile_image")
    @Builder.Default
    private String profileImage = "";
    @Column(unique = true)
    private String email;

    @Builder.Default
    private String description = "";

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "feature")
    private MemberFeature feature = MemberFeature.EARTH;

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<RoomMember> roomMembers = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<Til> tils = new ArrayList<>();

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<Like> likes = new ArrayList<>();

    public void updateMember(MemberUpdateRequestDto dto){
        if (dto.getName() != null) this.name = dto.getName();
        if (dto.getPassword() != null) this.password = dto.getPassword();
        if (dto.getNickname() != null) this.nickname = dto.getNickname();
        if (dto.getLink() != null) this.link = dto.getLink();
        if (dto.getProfileImage() != null) this.profileImage = dto.getProfileImage();
        if (dto.getEmail() != null) this.email = dto.getEmail();
        if (dto.getDescription() != null) this.description = dto.getDescription();
        if (dto.getFeature() != null) this.feature = dto.getFeature();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().memberId) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
    }

    public void delete(){
        deleteSoftly();
        this.getRoomMembers().forEach(RoomMember::deleteSoftly);
        this.getTils().forEach(Til::deleteSoftly);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.memberId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
