package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoungeRepository extends JpaRepository<Lounge, Long> {
    Optional<Lounge> findByIdAndIsDeletedFalse(Long id);

    Boolean existsByRoomAndName(Room room, String name);
}
