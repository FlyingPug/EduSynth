package com.dron.edusynthserver.config;

public class EduSynthUrl
{
    public static final String API = "/api/v1";
    public static final String API_PUBLIC = API + "/public";
    public static final String API_PRIVATE = API + "/private";
    public static final String AUTH = API_PUBLIC + "/auth";
    public static final String AUTH_REGISTER = AUTH + "/register";
    public static final String AUTH_SIGN = AUTH + "/login";

    public static final String SWAGGER = API_PUBLIC + "/api-docs";
    public static final String SESSION = API_PUBLIC + "/session";
    public static final String QUIZ = API_PUBLIC + "/quiz";
}
