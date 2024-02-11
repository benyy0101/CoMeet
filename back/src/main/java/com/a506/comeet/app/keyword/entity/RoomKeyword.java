package com.a506.comeet.app.keyword.entity;


import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Entity
@RequiredArgsConstructor
@SQLRestriction("is_deleted = 0")
public class RoomKeyword extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;

    public RoomKeyword(Room room, Keyword keyword) {
        this.room = room;
        this.keyword = keyword;
    }

    public void delete(){
        deleteSoftly();
        room.getRoomKeywords().remove(this);
        keyword.getRoomKeywords().remove(this);
    }
}
