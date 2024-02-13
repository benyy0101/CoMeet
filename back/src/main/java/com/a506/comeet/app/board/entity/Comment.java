package com.a506.comeet.app.board.entity;

import com.a506.comeet.app.board.controller.dto.CommentUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@AllArgsConstructor
@SQLRestriction("is_deleted = 0")
@NoArgsConstructor(access = PROTECTED)
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    @ManyToOne
    @JoinColumn(name = "writer_id")
    private Member writer;
    private String content;

    public void update(CommentUpdateRequestDto req) {
        if(req.getContent() != null)
            this.content = req.getContent();
    }

    public void delete() {
        deleteSoftly();
    }
}