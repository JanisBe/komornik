package pl.janis.komornik.rest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BaseController implements ErrorController {
    @RequestMapping("")
    public String gui() {
        return "forward:/index.html";
    }
}
