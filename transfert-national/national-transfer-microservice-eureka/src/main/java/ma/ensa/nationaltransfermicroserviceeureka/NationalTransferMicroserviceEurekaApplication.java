package ma.ensa.nationaltransfermicroserviceeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class NationalTransferMicroserviceEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(NationalTransferMicroserviceEurekaApplication.class, args);
	}

}
