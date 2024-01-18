package com.a506.comeet.room.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Lounge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private String name;

    protected Lounge() {
    }


}
