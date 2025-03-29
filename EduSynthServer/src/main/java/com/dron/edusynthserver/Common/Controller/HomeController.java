package com.dron.edusynthserver.Common.Controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController implements ErrorController {
    @RequestMapping(value = "${server.error.path:${error.path:/error}}")
    public String error() {
        return "forward:/index.html";
    }
}