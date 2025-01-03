package ma.ensa.nationaltransfermicroservicesirone;

import ma.ensa.nationaltransfermicroservicesirone.Daos.BlacklistedClientDAO;
import ma.ensa.nationaltransfermicroservicesirone.Entities.BlacklistedClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceSironeApplication {

	@Autowired
	BlacklistedClientDAO blacklistedClientDAO;

	public static void main(String[] args) {
		SpringApplication.run(NationalTransferMicroserviceSironeApplication.class, args);
	}

	@Bean
	CommandLineRunner run() {
		return args -> {
//			for (int i = 0; i < 5; i++) {
//				BlacklistedClient blacklistedClient = new BlacklistedClient();
//				blacklistedClient.setBclientId((long) i);
//				blacklistedClient.setCause("cause" + i);
//				blacklistedClient.setBlacklistingDate(new Date());
//				blacklistedClientDAO.save(blacklistedClient);
//			}
		};
	}
}
