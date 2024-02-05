package com.a506.comeet.metadata.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RoomRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void add(String roomKey, String memberId) {
        redisTemplate.opsForSet().add(roomKey, memberId);
    }

    public void delete(String roomKey, String memberId) {
        redisTemplate.opsForSet().remove(roomKey, memberId);
    }

    public Integer count(String roomKey) {
        return redisTemplate.opsForSet().size(roomKey).intValue();
    }
}
