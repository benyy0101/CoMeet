package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Channel;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    int countByRoom(Room room);
}
