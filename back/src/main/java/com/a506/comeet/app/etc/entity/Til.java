package com.a506.comeet.app.etc.entity;

import com.a506.comeet.app.etc.controller.dto.TilCreateRequestDto;
import com.a506.comeet.app.etc.controller.dto.TilUpdateRequestDto;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Til extends BaseEntityWithSoftDelete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    private String context;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    public Til(Member member, String context, LocalDate date) {
        this.member = member;
        this.context = context;
        this.date = date;
    }

    public void update(TilUpdateRequestDto req){
        if (req.getContext() != null) this.context = req.getContext();
    }
    public void delete(){
        deleteSoftly();
    }
}
