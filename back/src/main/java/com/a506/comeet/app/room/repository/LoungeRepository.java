package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoungeRepository extends JpaRepository<Lounge, Long> {
    boolean existsByRoomAndName(Room room, String name);
    int countByRoom(Room room);
}
