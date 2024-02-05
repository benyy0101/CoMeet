package com.a506.comeet.metadata.repository;

import com.a506.comeet.common.util.DateParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
@Slf4j
public class MemberRedisRepository {
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public void save(String currentMemberKey, Long roomId, LocalDateTime enterTime){
        redisTemplate.opsForHash().put(currentMemberKey, "roomId", roomId.toString());
        redisTemplate.opsForHash().put(currentMemberKey, "enterTime", DateParser.stringParse(enterTime));
    }

    @Transactional
    public String delete(String currentMemberKey){
        redisTemplate.opsForHash().delete(currentMemberKey, "roomId");
        String returnValue = (String) redisTemplate.opsForHash().get(currentMemberKey, "enterTime");
        redisTemplate.opsForHash().delete(currentMemberKey, "enterTime");
        return returnValue;
    }

    public boolean findCurrentRoom(String currentMemberKey){
        log.info("{}", currentMemberKey);
        return redisTemplate.opsForHash().hasKey(currentMemberKey, "roomId");
    }

}
