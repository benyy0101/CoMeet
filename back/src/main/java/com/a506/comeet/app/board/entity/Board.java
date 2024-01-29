package com.a506.comeet.app.board.entity;

import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.member.entity.Like;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "like_count")
    private Integer likeCount;
    private BoardType type;
    private FreeBoardCategory category;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
    private Boolean isValid;

    @OneToMany(mappedBy = "board")
    private List<Like> likes = new ArrayList<>();

    public void update(BoardUpdateRequestDto req) {
        if(req.getTitle() != null)
            this.title = req.getTitle();
        if(req.getContent() != null)
            this.content = req.getContent();
        if(req.getCategory() != null)
            this.category = req.getCategory();
        if(req.getIsValid() != null)
            this.isValid = req.getIsValid();
    }

    public void delete() {
        deleteSoftly();
    }
}