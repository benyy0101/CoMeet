package com.a506.comeet.app.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="from_member_id")
    private Member from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="to_member_id")
    private Member to;

    public Follow(Member from, Member to) {
        this.from = from;
        this.to = to;
    }
}
