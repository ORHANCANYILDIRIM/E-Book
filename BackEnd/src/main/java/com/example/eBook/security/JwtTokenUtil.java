package com.example.eBook.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private final String SECRET = "super-secret-key-eslem-icin-en-az-32-karakter!"; // min 32 karakter
    private final long EXPIRATION_MS = 86400000; // 1 gün

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ✅ Token oluştur
    public String generateToken(String email, String rol, Integer userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("rol", rol) // 🔥 rol bilgisini token içine koy
                .claim("userId", userId) // 🔥 burası kritik
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    // ✅ Token'dan email'i al
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // ✅ Token geçerli mi?
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
