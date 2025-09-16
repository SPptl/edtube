package com.edtube.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "redirect:http://localhost:3000";
    }

    @GetMapping("/login")
    public String login() {
        return "redirect:http://localhost:3000/login";
    }
}
