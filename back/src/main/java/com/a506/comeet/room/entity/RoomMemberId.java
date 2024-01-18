package com.a506.comeet.room.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
public class RoomMemberId implements Serializable {

    private String memberId;
    private Long roomId;

    protected RoomMemberId() {
    }

    public RoomMemberId(String memberId, Long roomId) {
        this.memberId = memberId;
        this.roomId = roomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoomMemberId that = (RoomMemberId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(roomId, that.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, roomId);
    }
}