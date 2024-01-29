package com.a506.comeet.app.board.entity;

import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.RoomMember;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@AllArgsConstructor
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

    public void update(BoardUpdateRequestDto req) {
        if(req.getTitle() != null)
            this.title = req.getTitle();
        if(req.getContent() != null)
            this.content = req.getContent();
        if(req.getCategory() != null)
            this.category = req.getCategory();
        if(req.getValid() != null)
            this.valid = req.getValid();
    }

    public void delete() {
        deleteSoftly();
    }
}