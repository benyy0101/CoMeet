package com.a506.comeet.keyword.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@RequiredArgsConstructor
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
