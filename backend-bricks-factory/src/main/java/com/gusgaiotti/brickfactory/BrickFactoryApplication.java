package com.gusgaiotti.brickfactory;

import com.gusgaiotti.brickfactory.service.BrickService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BrickFactoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrickFactoryApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(BrickService brickService) {
		return args -> {
			System.out.println("Inicializando banco de dados com 100 tijolos...");
			brickService.initializeBricks();
			System.out.println("Inicialização completa.");
		};
	}
}