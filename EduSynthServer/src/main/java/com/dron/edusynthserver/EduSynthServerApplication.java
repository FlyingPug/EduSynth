package com.dron.edusynthserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Controller
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class EduSynthServerApplication implements ErrorController {

    public static void main(String[] args) {
        SpringApplication.run(EduSynthServerApplication.class, args);
    }
}
