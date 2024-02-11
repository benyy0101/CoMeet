package com.a506.comeet.app.keyword.entity;

import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@SQLRestriction("is_deleted = 0")
public class Keyword extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "keyword")
    private List<RoomKeyword> roomKeywords = new ArrayList<>();

    public Keyword(String name) {
        this.name = name;
    }

    public void delete(){
        deleteSoftly();
        this.roomKeywords.forEach(RoomKeyword::deleteSoftly);
    }
}
