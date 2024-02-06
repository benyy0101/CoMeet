package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {
<<<<<<< HEAD
    public Room findByTitle(String title);
    Optional<Room> findByIdAndIsDeletedFalse(Long id);

    Boolean existsByTitle(String title);
=======
    Optional<Room> findByTitle(String title);
>>>>>>> e1e6d23a7b37650d9fcbf1e4b76c376832529c3b
}
