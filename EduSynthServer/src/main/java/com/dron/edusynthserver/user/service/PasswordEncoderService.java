package com.dron.edusynthserver.user.service;

import java.util.Optional;

public interface PasswordEncoderService
{
    String GenerateSalt();

    String CalculateHash(String password, String salt);

    Boolean VerifyHash(String password, String salt, String hash);
}
