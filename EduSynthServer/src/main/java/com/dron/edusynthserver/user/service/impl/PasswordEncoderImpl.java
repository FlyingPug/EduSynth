package com.dron.edusynthserver.user.service.impl;

import com.dron.edusynthserver.user.service.PasswordEncoderService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PasswordEncoderImpl implements PasswordEncoderService {

    @Override
    public String GenerateSalt() {
        return BCrypt.gensalt();
    }

    @Override
    public String CalculateHash(String password, String salt) {
        return BCrypt.hashpw(password, salt);
    }

    @Override
    public Boolean VerifyHash(String password, String salt, String hash) {
        var newHash = CalculateHash(password, salt);
        return Objects.equals(newHash, hash);
    }
}
