package com.a506.comeet.metadata.repository;

import com.a506.comeet.app.DateParser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class RoomMemberRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(String roomMemberKey, LocalDateTime enterTime){
        redisTemplate.opsForValue().set(
                roomMemberKey,
                DateParser.stringParse(enterTime)
        );
    }

    public String delete(String roomMemberKey){
        String returnValue = redisTemplate.opsForValue().get(roomMemberKey);
        redisTemplate.delete(roomMemberKey);
        return returnValue;
    }

    public String find(String roomMemberKey){
        return redisTemplate.opsForValue().get(roomMemberKey);
    }
}
