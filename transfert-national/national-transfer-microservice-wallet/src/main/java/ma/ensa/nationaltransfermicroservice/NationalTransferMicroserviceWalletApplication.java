package ma.ensa.nationaltransfermicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceWalletApplication {

    public static void main(String[] args) {
        SpringApplication.run(NationalTransferMicroserviceWalletApplication.class, args);
    }

}
