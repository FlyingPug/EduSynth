package com.dron.edusynthserver.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dron.edusynthserver.User.Model.Role;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.auth0.jwt.algorithms.Algorithm;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

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
                .withClaim("id", user.getId())
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

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);

        User user = User.builder()
                .email(decoded.getSubject())
                .username(decoded.getClaim("name").asString())
                .role(Role.valueOf(decoded.getClaim("role").asString()))
                .build();

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + decoded.getClaim("role").asString())
        );

        return new UsernamePasswordAuthenticationToken(user, null, authorities);
    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        User user = userRepository.findByEmail(decoded.getSubject()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );
        return new UsernamePasswordAuthenticationToken(user, null, authorities);
    }

}