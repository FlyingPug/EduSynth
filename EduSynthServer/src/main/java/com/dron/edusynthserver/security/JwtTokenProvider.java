package com.dron.edusynthserver.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dron.edusynthserver.exceptions.Unauthorized;
import com.dron.edusynthserver.user.mapper.UserMapper;
import com.dron.edusynthserver.user.model.Role;
import com.dron.edusynthserver.user.model.User;
import com.dron.edusynthserver.user.repository.UserRepository;
import com.dron.edusynthserver.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import com.dron.edusynthserver.user.dto.UserDto;

import com.auth0.jwt.algorithms.Algorithm;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    private final UserRepository userRepository;

    @Autowired
    public JwtTokenProvider(UserRepository _userRepository)
    {
        userRepository = _userRepository;
    }

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        jwtSecret = Base64.getEncoder().encodeToString(jwtSecret.getBytes());
    }

    public String createToken(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + jwtExpirationInMs); // 1 hour 3600000

        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("name", user.getUsername())
                .withClaim("role", user.getRole().toString())
                .sign(algorithm);
    }

    public String refreshToken(String RefreshToken) {
        Authentication authentication = validateToken(RefreshToken);
        return createToken((User)authentication.getPrincipal());
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        try {

        DecodedJWT decoded = verifier.verify(token);

        User user = User.builder()
                .email(decoded.getSubject())
                .username(decoded.getClaim("name").asString())
                .role(Role.valueOf(decoded.getClaim("role").asString()))
                .build();

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

        } catch(JWTDecodeException ex) {
            throw new Unauthorized();
        }
    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        try {
            DecodedJWT decoded = verifier.verify(token);

        User user = userRepository.findByEmail(decoded.getSubject());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

        } catch(JWTDecodeException ex) {
            throw new Unauthorized();
        }
    }

}