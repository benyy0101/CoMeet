package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByIdAndIsDeletedFalse(Long id);

    Boolean existsByRoomAndName(Room room, String name);
}
