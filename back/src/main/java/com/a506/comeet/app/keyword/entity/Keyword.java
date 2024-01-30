package com.a506.comeet.app.keyword.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DialectOverride;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Keyword extends BaseEntityWithSoftDelete {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String name;

    @OneToMany(mappedBy = "keyword", fetch = FetchType.LAZY)
    private List<MemberKeyword> memberKeywords = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", fetch = FetchType.LAZY)
    private List<RoomKeyword> roomKeywords = new ArrayList<>();

    public Keyword(String name) {
        this.name = name;
    }

    public void delete(){
        deleteSoftly();
        this.roomKeywords.forEach(RoomKeyword::deleteSoftly);
        this.memberKeywords.forEach(MemberKeyword::deleteSoftly);
    }
}
