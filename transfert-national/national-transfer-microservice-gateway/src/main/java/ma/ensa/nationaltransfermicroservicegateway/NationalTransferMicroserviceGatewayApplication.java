package ma.ensa.nationaltransfermicroservicegateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class NationalTransferMicroserviceGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(NationalTransferMicroserviceGatewayApplication.class, args);
    }

    @Bean
    RouteLocator staticRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/api/transfer/**")
                        .uri("lb://NATIONAL-TRANSFER-MICROSERVICE-TRANSFER/"))
                .route(p -> p
                        .path("/api/wallet/**", "/api/client/**", "/api/prospect/**")
                        .uri("lb://NATIONAL-TRANSFER-MICROSERVICE-WALLET/"))
                .route(p -> p
                        .path("/api/notification/**")
                        .uri("lb://NATIONAL-TRANSFER-MICROSERVICE-NOTIFICATION/"))
                .route(p -> p
                        .path("/api/siron/**")
                        .uri("lb://NATIONAL-TRANSFER-MICROSERVICE-SIRONE/"))
                .build();
    }

}
