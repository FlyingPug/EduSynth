package com.dron.edusynthserver.Common.Config;

public class EduSynthUrl
{
    public static final String API = "/api/v1";
    public static final String API_PUBLIC = API + "/public";
    public static final String API_PRIVATE = API + "/private";

    public static final String AUTH = API_PUBLIC + "/auth";
    public static final String AUTH_REGISTER = AUTH + "/register";
    public static final String AUTH_SIGN = AUTH + "/login";
    public static final String CURRENT_USER_PROFILE =  API_PRIVATE + "/user";

    public static final String SWAGGER = API_PRIVATE + "/api-docs";
    public static final String SESSION = API_PRIVATE + "/session";
    public static final String QUIZ = API_PRIVATE + "/quiz";
    public static final String UPLOAD_PRIVATE = API_PRIVATE + "/upload";
    public static final String UPLOAD_PUBLIC = API_PUBLIC + "/upload";

    public static final String UPLOAD_FILE = "./files/upload/";
    public static final String UPLOAD_FILE_IMAGE = UPLOAD_FILE + "/image";
}
