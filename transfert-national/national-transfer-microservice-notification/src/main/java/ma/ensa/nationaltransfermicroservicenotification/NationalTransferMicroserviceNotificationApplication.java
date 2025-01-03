package ma.ensa.nationaltransfermicroservicenotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceNotificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(NationalTransferMicroserviceNotificationApplication.class, args);
    }

}
