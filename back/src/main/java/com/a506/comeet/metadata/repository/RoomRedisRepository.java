package com.a506.comeet.metadata.repository;

import com.a506.comeet.common.util.KeyUtil;
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

    public void deleteAll(Long roomId){
        String roomKey = KeyUtil.getRoomKey(roomId);
        Set<String> res = getMembers(roomId);
        log.info("방 삭제 전 현재 방에 있는 인원 정보 : {}", String.join(", ", res));
        redisTemplate.delete(roomKey);
    }

    public Set<String> getMembers(Long roomId){
        return redisTemplate.opsForSet().members(KeyUtil.getRoomKey(roomId));}
}
