package com.a506.comeet.app.board.entity;

import com.a506.comeet.app.board.controller.dto.BoardUpdateRequestDto;
import com.a506.comeet.app.member.entity.Like;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.BaseEntity;
import com.a506.comeet.common.enums.BoardType;
import com.a506.comeet.common.enums.FreeBoardCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@AllArgsConstructor
@SQLRestriction("is_deleted = 0")
@NoArgsConstructor(access = PROTECTED)
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;
    private String title;
    private String content;
    @Column(name = "like_count")
    private Integer likeCount;
    @Enumerated(EnumType.STRING)
    private BoardType type;
    @Enumerated(EnumType.STRING)
    private FreeBoardCategory category;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;
    private Boolean isValid;

    @Builder.Default
    @OneToMany(mappedBy = "board")
    private List<Like> likes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

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

    public void incrementLikeCount() {
        this.likeCount += 1;
    }

    public void decrementLikeCount() {
        this.likeCount -= 1;
    }

    public void delete() {
        this.room = null;
        deleteSoftly();
    }
}