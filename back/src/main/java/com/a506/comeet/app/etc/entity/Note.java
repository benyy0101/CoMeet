package com.a506.comeet.app.etc.entity;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Note extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="writer_member_id")
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="receiver_member_id")
    private Member receiver;

    private String context;

    private Boolean isRead;

    @Builder
    public Note(Member writer, Member receiver, String context, Boolean isRead) {
        this.writer = writer;
        this.receiver = receiver;
        this.context = context;
        this.isRead = isRead;
    }

    public void delete(){
        deleteSoftly();
    }
    public void read() {
        this.isRead = true;
    }
}
