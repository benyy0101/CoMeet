package com.a506.webrtc.chatmessage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("i10a506.p.ssafy.io:3001", "https://i10a506.p.ssafy.io", "http://localhost:3000")
			.allowedHeaders("Authorization", "content-type")
			.allowedMethods("GET", "POST", "DELETE", "PATCH", "OPTIONS")
			.allowCredentials(true);

	}
}
