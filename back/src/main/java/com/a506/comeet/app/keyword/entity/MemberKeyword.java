package com.a506.comeet.app.keyword.entity;

import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Entity
@RequiredArgsConstructor
@SQLRestriction("is_deleted = 0")
public class MemberKeyword extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    public void delete(){
        deleteSoftly();
        keyword.getMemberKeywords().remove(this);
    }

}
