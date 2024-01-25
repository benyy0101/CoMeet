package com.a506.comeet.login;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {

    private Key key;

    public JwtUtil(@Value("${spring.jwt.secret}") String secretKey){
            byte[] keyBytes = Decoders.BASE64.decode(secretKey); // base64로 디코딩 -> 바이트 배열로 변환
            this.key = Keys.hmacShaKeyFor(keyBytes); // hmacsha256으로 다시 암호화?
        }

}
