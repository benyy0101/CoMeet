package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {
    Optional<Room> findByTitle(String title);
}
