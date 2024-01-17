package com.a506.comeet.board.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "writer_id")
    private String writerId;
    private String title;
    private String context;
    private int likecount;
    private String type;
    private String categoty;
    @Column(name = "room_id")
    private Long roomId;
    private boolean valid;

    @Builder
    public Board(String writerId, String title, String context, String type, Long roomId, String categoty) {
        this.writerId = writerId;
        this.title = title;
        this.context = context;
        this.type = type;
        this.roomId = roomId;
        this.categoty = categoty;
    }
}
