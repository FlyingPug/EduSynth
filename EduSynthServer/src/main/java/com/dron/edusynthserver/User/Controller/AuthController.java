package com.dron.edusynthserver.User.Controller;

import com.dron.edusynthserver.Common.Config.EduSynthUrl;
import com.dron.edusynthserver.Security.JwtTokenProvider;
import com.dron.edusynthserver.User.Dto.CredentialsDto;
import com.dron.edusynthserver.User.Dto.SignUpDto;
import com.dron.edusynthserver.User.Dto.UserDto;
import com.dron.edusynthserver.User.Mapper.UserMapper;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public UserDto login(@RequestBody CredentialsDto credentialsDto) {
        User user = userService.login(credentialsDto);
        UserDto userDto = userMapper.toDTO(user);
        userDto.setToken(userAuthenticationProvider.createToken(user));
        return userDto;
    }

    @GetMapping(path = EduSynthUrl.CURRENT_USER_PROFILE)
    public UserDto getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userMapper.toDTO((User)authentication.getPrincipal());
    }

    @PostMapping(EduSynthUrl.AUTH_REGISTER)
    public UserDto register(@RequestBody SignUpDto user) {
        User createdUser = userService.register(user);
        UserDto userDto = userMapper.toDTO(createdUser);
        userDto.setToken(userAuthenticationProvider.createToken(createdUser));
        return userDto;
    }
}
