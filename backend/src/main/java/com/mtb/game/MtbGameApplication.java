package com.mtb.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MtbGameApplication {
    public static void main(String[] args) {
        SpringApplication.run(MtbGameApplication.class, args);
    }
}
