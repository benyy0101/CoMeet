package com.a506.comeet.room.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.room.controller.LoungeUpdateRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Lounge extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private String name;

    protected Lounge() {
    }

    @Builder
    public Lounge(Long id, Room room, String name) {
        this.id = id;
        this.room = room;
        this.name = name;
    }

    public void update(LoungeUpdateRequestDto req){
        this.name = req.getName();
    }


    public void delete(){
        deleteSoftly();
        room.getLounges().remove(this);
    }
}
