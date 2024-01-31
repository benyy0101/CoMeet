package com.a506.comeet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "com.a506.comeet.app")
@EnableMongoRepositories(basePackages = "com.a506.comeet.metadata")
public class ComeetApplication {
	public static void main(String[] args) {
		SpringApplication.run(ComeetApplication.class, args);
	}
}
