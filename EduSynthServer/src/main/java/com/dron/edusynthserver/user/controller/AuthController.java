package com.dron.edusynthserver.user.controller;

import com.dron.edusynthserver.config.EduSynthUrl;
import com.dron.edusynthserver.security.JwtTokenProvider;
import com.dron.edusynthserver.session.dto.ParticipantDto;
import com.dron.edusynthserver.session.dto.SessionResultDto;
import com.dron.edusynthserver.user.dto.CredentialsDto;
import com.dron.edusynthserver.user.dto.SignUpDto;
import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.mapper.UserMapper;
import com.dron.edusynthserver.user.model.User;
import com.dron.edusynthserver.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController
{
    private final UserService userService;
    private final JwtTokenProvider userAuthenticationProvider;

    private final UserMapper userMapper;

    /*
        Знаешь, у тебя в api почему-то часто дублируются сущности, в этом нет смысла
        Вернул id пользователя да инфу о токене, а он если нужно обратится за инфой о юзере к юзере к другому контроллеру
        TODO: Сделать возвращения AuthInfo
     */
    @PostMapping( path = EduSynthUrl.AUTH_SIGN, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        User user = userService.login(credentialsDto);
        UserDto userDto = userMapper.toDTO(user);
        userDto.setToken(userAuthenticationProvider.createToken(user));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping (path = EduSynthUrl.CURRENT_USER_PROFILE)
    public ResponseEntity<UserDto> GetCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(!(authentication instanceof AnonymousAuthenticationToken))
        {
            return ResponseEntity.ok(userMapper.toDTO((User)authentication.getPrincipal()));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @PostMapping(EduSynthUrl.AUTH_REGISTER)
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto user) {
        User createdUser = userService.register(user);
        UserDto userDto = userMapper.toDTO(createdUser);
        userDto.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(userDto);
    }
}
