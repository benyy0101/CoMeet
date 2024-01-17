package com.a506.comeet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ComeetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComeetApplication.class, args);
	}

}
