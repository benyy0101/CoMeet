package com.a506.comeet.metadata.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CurrentMemberRedisRepository {
    private final RedisTemplate<String, String> redisTemplate;

    public void save(String currentMemberKey, Long roomId){
        redisTemplate.opsForValue().set(
                currentMemberKey,
                roomId.toString()
        );
    }

    public void delete(String currentMemberKey){
        redisTemplate.delete(currentMemberKey);
    }

    public String find(String currentMemberKey){
        return redisTemplate.opsForValue().get(currentMemberKey);
    }

}
