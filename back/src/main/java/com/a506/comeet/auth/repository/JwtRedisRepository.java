package com.a506.comeet.auth.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Component
public class JwtRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(String memberId, String refreshToken, long refreshTokenValidityInSeconds){
        redisTemplate.opsForValue().set(
                memberId,
                refreshToken,
                refreshTokenValidityInSeconds,
                TimeUnit.SECONDS
        );
    }

    public void delete(String memberId){
        redisTemplate.delete(memberId);
    }

    public String getRefreshToken(String memberId){
        return redisTemplate.opsForValue().get(memberId);
    }
}
