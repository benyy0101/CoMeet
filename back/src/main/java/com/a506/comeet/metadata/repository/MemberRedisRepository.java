package com.a506.comeet.metadata.repository;

import com.a506.comeet.common.util.DateParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import static com.a506.comeet.common.util.KeyUtil.getCurrentMemberKey;

@RequiredArgsConstructor
@Component
@Slf4j
public class MemberRedisRepository {
    private final RedisTemplate<String, String> redisTemplate;


    public void save(String memberId, Long roomId, LocalDateTime enterTime){
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public <K, V> Object execute(RedisOperations<K, V> operations) throws DataAccessException {
                operations.multi();
                redisTemplate.opsForHash().put(getCurrentMemberKey(memberId), "roomId", roomId.toString());
                redisTemplate.opsForHash().put(getCurrentMemberKey(memberId), "enterTime", DateParser.stringParse(enterTime));
                return operations.exec();
            }
        });
    }

    public String getEnterTime(String memberId){
        return (String) redisTemplate.opsForHash().get(getCurrentMemberKey(memberId), "enterTime");
    }


    public Long getCurrentRoomId(String memberId){
        String o = (String) redisTemplate.opsForHash().get(getCurrentMemberKey(memberId), "roomId");
        return o!= null ? Long.parseLong(o) : null;
    }

}
