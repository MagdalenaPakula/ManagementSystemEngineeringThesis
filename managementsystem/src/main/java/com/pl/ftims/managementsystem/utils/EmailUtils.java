package com.pl.ftims.managementsystem.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendSimpleMessage(String to, String subject, String text, List<String> list){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("dupa927468@mailinator.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);
        if(list!=null && list.size()>0){
            simpleMailMessage.setCc(getCCArray(list));
        }
        javaMailSender.send(simpleMailMessage);
    }

    private String[] getCCArray(List<String> ccList){
        String[] cc = new String[ccList.size()];
        for(int i=0;i<ccList.size();i++){
            cc[i] = ccList.get(i);
        }
        return cc;
    }

    public void forgotMail(String to, String subject, String password) throws MessagingException{
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("dupa927468@mailinator.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String htmlMsg = "<p><b>Your Login details for this Business System</b><br><b>Email: </b> " + to + "<br><b>Password: </b> " + password + "<br><a href=\"http://localhost:4200/\">Click here to login</a></p>";
        message.setContent(htmlMsg, "text/html");
        javaMailSender.send(message);

    }

}
