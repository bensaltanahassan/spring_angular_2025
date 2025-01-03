package ma.ensa.nationaltransfermicroservicenotification.controllers;

import ma.ensa.nationaltransfermicroservicenotification.dtos.EmailDetailsDTO;
import ma.ensa.nationaltransfermicroservicenotification.services.EmailService;
import ma.ensa.nationaltransfermicroservicenotification.utils.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notification")
public class NotificationController {

    private final EmailService emailService;

    public NotificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("hello-world")
    public String hello() {
        return "Hello";
    }

    @PostMapping("send-signup-password-notification")
    public void sendSignUpPasswordNotification(@RequestBody EmailDetailsDTO emailDetailsDTO) {
        this.emailService.sendSimpleMail(new EmailDetails(
                emailDetailsDTO.getEmail(),
                emailDetailsDTO.getPassword(),
                "Your account creation password",
                null
            )
        );
    }
}
