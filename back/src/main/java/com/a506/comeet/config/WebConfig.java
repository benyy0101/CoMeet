package com.a506.comeet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("i10a506.p.ssafy.io:3000")
                .allowedHeaders("Authorization", "Content-Type")
                .allowedMethods("GET", "POST", "DELETE", "PATCH")
                .allowCredentials(true);
    }

}
