package com.a506.comeet.app.board.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
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
    private BoardType type;
    private FreeBoardCategory categoty;
    @Column(name = "room_id")
    private Long roomId;
    private boolean valid;

    public Board(Long id, String writerId, String title, String content, Integer likecount, BoardType type, FreeBoardCategory categoty, Long roomId, boolean valid) {
        this.id = id;
        this.writerId = writerId;
        this.title = title;
        this.content = content;
        this.likecount = likecount;
        this.type = type;
        this.categoty = categoty;
        this.roomId = roomId;
        this.valid = valid;
    }
}