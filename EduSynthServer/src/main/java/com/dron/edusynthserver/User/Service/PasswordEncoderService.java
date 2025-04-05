package com.dron.edusynthserver.User.Service;

public interface PasswordEncoderService
{
    String GenerateSalt();

    String CalculateHash(String password, String salt);

    Boolean VerifyHash(String password, String salt, String hash);
}
