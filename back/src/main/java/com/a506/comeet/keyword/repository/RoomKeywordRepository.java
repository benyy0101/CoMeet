package com.a506.comeet.keyword.repository;

import com.a506.comeet.keyword.entity.Keyword;
import com.a506.comeet.keyword.entity.RoomKeyword;
import com.a506.comeet.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomKeywordRepository extends JpaRepository<RoomKeyword, Long>, RoomKeywordCustomRepository {

    void deleteByRoomAndKeyword(Room room, Keyword keyword);
}
