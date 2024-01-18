package com.a506.comeet.room.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.room.controller.ChannelUpdateRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Channel extends BaseEntityWithSoftDelete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private String name;

    protected Channel() {
    }
    @Builder
    public Channel(Long id, Room room, String name) {
        this.id = id;
        this.room = room;
        this.name = name;
    }
    public void update(ChannelUpdateRequestDto req){
        this.name = req.getName();
    }
    public void delete(){
        deleteSoftly();
        room.getChannels().remove(this);
    }
}
