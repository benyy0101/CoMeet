package com.a506.comeet.app.keyword.repository;

import com.a506.comeet.app.keyword.entity.Keyword;
import com.a506.comeet.app.keyword.entity.RoomKeyword;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomKeywordRepository extends JpaRepository<RoomKeyword, Long>, RoomKeywordCustomRepository {

    void deleteByRoomAndKeyword(Room room, Keyword keyword);
}
