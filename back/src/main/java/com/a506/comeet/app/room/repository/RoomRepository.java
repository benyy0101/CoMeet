package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {

    Room findByTitle(String title);
    boolean existsByTitle(String title);
}
