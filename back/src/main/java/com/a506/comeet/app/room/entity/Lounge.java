package com.a506.comeet.app.room.entity;

import com.a506.comeet.app.room.controller.dto.LoungeUpdateRequestDto;
import com.a506.comeet.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@SQLRestriction("is_deleted = 0")
public class Lounge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;

    private String name;

    public void update(LoungeUpdateRequestDto req){
        if (req.getName() != null) this.name = req.getName();
    }

    public void delete(){
        deleteSoftly();
        room.getLounges().remove(this);
    }
}
