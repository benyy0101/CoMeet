package com.a506.comeet.app.board.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Board extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "writer_id")
    private String writerId;
    private String title;
    private String content;
    private Integer likecount;
    private String type;
    private String categoty;
    @Column(name = "room_id")
    private Long roomId;
    private boolean valid;

    @Builder
    public Board(String writerId, String title, String content, String type, Long roomId, String categoty, boolean valid) {
        this.writerId = writerId;
        this.title = title;
        this.content = content;
        this.type = type;
        this.roomId = roomId;
        this.categoty = categoty;
        this.valid = valid;
    }
}
