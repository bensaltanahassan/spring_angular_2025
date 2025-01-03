package ma.ensa.nationaltransfermicroservicetransfer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceTransferApplication {

    public static void main(String[] args) {
        SpringApplication.run(NationalTransferMicroserviceTransferApplication.class, args);
    }

}
