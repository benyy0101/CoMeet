package com.a506.comeet.room.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.room.controller.dto.ChannelUpdateRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Builder
@AllArgsConstructor
public class Channel extends BaseEntityWithSoftDelete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private String name;

    public void update(ChannelUpdateRequestDto req){
        this.name = req.getName();
    }

    public void delete(){
        deleteSoftly();
        room.getChannels().remove(this);
    }
}
