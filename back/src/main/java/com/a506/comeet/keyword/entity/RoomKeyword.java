package com.a506.comeet.keyword.entity;


import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.entity.Room;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

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
