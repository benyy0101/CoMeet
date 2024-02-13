package com.a506.comeet.app.keyword.repository;

import com.a506.comeet.app.keyword.entity.RoomKeyword;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomKeywordRepository extends JpaRepository<RoomKeyword, Long>, RoomKeywordCustomRepository {

    @Modifying
    @Query("DELETE FROM RoomKeyword rk WHERE rk.room.id = :roomId AND rk.keyword.id = :keywordId")
    void deleteByRoomIdAndKeywordId(@Param("roomId") Long roomId, @Param("keywordId") Long keywordId);
}
