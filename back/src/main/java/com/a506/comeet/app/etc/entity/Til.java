package com.a506.comeet.app.etc.entity;

import com.a506.comeet.app.etc.controller.dto.TilRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Til extends BaseEntityWithSoftDelete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    private String context;

    private LocalDate date;

    public Til(Member member, String context, LocalDate date) {
        this.member = member;
        this.context = context;
        this.date = date;
    }

    public void update(TilRequestDto req){
        this.context = req.getContext();
    }
    public void delete(){
        deleteSoftly();
    }
}
