package com.a506.comeet.app.keyword.entity;


import com.a506.comeet.app.room.entity.Room;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Entity
@RequiredArgsConstructor
public class RoomKeyword extends BaseEntityWithSoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
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
