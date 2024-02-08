package com.a506.comeet.metadata.repository;

import com.a506.comeet.common.util.DateParser;
import com.a506.comeet.common.util.KeyUtil;
import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
@Slf4j
public class CustomRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void enterMember(String memberId, Long roomId, LocalDateTime enterTime) {
        String currentMemberKey = KeyUtil.getCurrentMemberKey(memberId);
        String roomKey = KeyUtil.getRoomKey(roomId);

        // 트랜잭션 관리
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();
                // 현재 멤버가 어디에 있고, 언제 들어갔는지 저장
                operations.opsForHash().put(currentMemberKey, "roomId", roomId.toString());
                operations.opsForHash().put(currentMemberKey, "enterTime", DateParser.stringParse(enterTime));
                // 현재 어떤방에 어떤 멤버가 들어왔는지 저장
                operations.opsForSet().add(roomKey, memberId);
                return operations.exec();
            }
        });
    }

    public void leaveMember(String memberId, Long roomId) {
        String currentMemberKey = KeyUtil.getCurrentMemberKey(memberId);
        String roomKey = KeyUtil.getRoomKey(roomId);

        // 트랜잭션 관리
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) throws DataAccessException {
                operations.multi();
                // 해당 방 들어있는 유저정보에서 유저를 삭제
                operations.opsForSet().remove(roomKey, memberId);
                // 현재 유저의 시간 정보를 추출하고 위치정보와 시간정보를 삭제
                operations.opsForHash().delete(currentMemberKey, "roomId");
                operations.opsForHash().delete(currentMemberKey, "enterTime");
                return operations.exec();
            }
        });
    }

}
