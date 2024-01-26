package com.a506.comeet.app.board.entity;

import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
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
    private FreeBoardCategory category;
    @Column(name = "room_id")
    private Long roomId;
    private Boolean valid;

    public Board(Long id, String writerId, String title, String content, Integer likecount, BoardType type, FreeBoardCategory category, Long roomId, Boolean valid) {
        this.id = id;
        this.writerId = writerId;
        this.title = title;
        this.content = content;
        this.likecount = likecount;
        this.type = type;
        this.category = category;
        this.roomId = roomId;
        this.valid = valid;
    }

    public void update(BoardUpdateRequestDto req) {
        this.title = req.getTitle();
        this.content = req.getContent();
        this.category = req.getCategory();
        this.valid = req.getValid();
    }
}