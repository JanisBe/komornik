package pl.janis.komornik.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.janis.komornik.entities.User;

@Service
@RequiredArgsConstructor
@Log4j2
public class EmailService {
    private final JavaMailSender mailSender;
    private final Environment env;

    public void resetPasswordEmail(String to, int newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset hasła");
        message.setText("Twoje nowe hasło to: " + newPassword);

        mailSender.send(message);
    }

    public void sendVerificationEmail(User user) {
        try {

            MimeMessage message = mailSender.createMimeMessage();
            String msg = "Kliknij link, aby aktywować konto: http://" + env.getProperty("app.address") + "/verifyEmail?token=" + user.getVerificationToken() + "&userId=" + user.getId();
            message.setSubject("Witaj w Komorniku!");
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getMail());
            helper.setText(msg, true);
            mailSender.send(message);
        } catch (MessagingException ex) {
            log.error(ex.getMessage());
        }
    }
}
