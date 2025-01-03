package ma.ensa.nationaltransfermicroserviceauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(NationalTransferMicroserviceAuthApplication.class, args);
	}

}
