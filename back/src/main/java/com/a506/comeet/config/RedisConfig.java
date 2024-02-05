package com.a506.comeet.config;

import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import java.sql.SQLException;

@RequiredArgsConstructor
@Configuration
@EnableRedisRepositories
//@EnableTransactionManagement
// Redis가 단독 운영되지 않기 때문에 @EnableTransactionManagement 불필요
public class RedisConfig {

    private final EntityManagerFactory entityManagerFactory;
    private final RedisProperties redisProperties;

    // RedisProperties로 yaml에 저장한 host, port를 연결
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(redisProperties.getHost(), redisProperties.getPort());
    }

//    // serializer 설정으로 redis-cli를 통해 직접 데이터를 조회할 수 있도록 설정
//    // 했었으나 StringRedisTemplate로 serializer 적용된 채로 쉽게 사용 가능
//
//    @Bean
//    public RedisTemplate<String, String> stringRedisTemplate() {
//        StringRedisTemplate redisTemplate = new StringRedisTemplate();
//        redisTemplate.setConnectionFactory(redisConnectionFactory());
//        redisTemplate.setEnableTransactionSupport(true); // redis Transaction
//        return redisTemplate;
//    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setEnableTransactionSupport(true); // redis Transaction
        return redisTemplate;
    }

    @Bean
    @Primary // 트랜잭션 매니저를 우선적으로 사용
    public PlatformTransactionManager transactionManager() throws SQLException {
        return new JpaTransactionManager(entityManagerFactory);
    }

}
