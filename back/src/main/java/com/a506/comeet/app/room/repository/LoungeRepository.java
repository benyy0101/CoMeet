package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoungeRepository extends JpaRepository<Lounge, Long> {
<<<<<<< HEAD
    Optional<Lounge> findByIdAndIsDeletedFalse(Long id);

    Boolean existsByRoomAndName(Room room, String name);
=======
    int countByRoom(Room room);
>>>>>>> e1e6d23a7b37650d9fcbf1e4b76c376832529c3b
}
