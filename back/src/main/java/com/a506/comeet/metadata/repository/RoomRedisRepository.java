package com.a506.comeet.metadata.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;

@RequiredArgsConstructor
@Component
@Slf4j
public class RoomRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void add(String roomKey, String memberId) {
        redisTemplate.opsForSet().add(roomKey, memberId);
    }

    public void delete(String roomKey, String memberId) {
        redisTemplate.opsForSet().remove(roomKey, memberId);
    }

    public Set<String> deleteAll(String roomKey){
        Set<String> res = getMembers(roomKey);
        log.info("방 삭제 전 현재 방에 있는 인원 정보 : {}", String.join(", ", res));
        redisTemplate.delete(roomKey);
        return res;
    }

    public Set<String> getMembers(String roomKey){return redisTemplate.opsForSet().members(roomKey);}
}
