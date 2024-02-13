package com.a506.comeet;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.time.LocalDateTime;
import java.util.TimeZone;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.a506.comeet.app")
@EnableMongoRepositories(basePackages = "com.a506.comeet.metadata")
@Slf4j
public class ComeetApplication {

	@PostConstruct
	public void timezone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		log.info("현재 시간 : {}", LocalDateTime.now());
	}

	public static void main(String[] args) {
		SpringApplication.run(ComeetApplication.class, args);
	}
}
