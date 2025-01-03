package ma.ensa.nationaltransfermicroservicetransfer.web;

import ma.ensa.nationaltransfermicroservicetransfer.entities.Client;
import ma.ensa.nationaltransfermicroservicetransfer.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("clients")
@RestController
public class ClientController {
    private ClientService clientService;

    @Autowired
    public void setClientService(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/create")
    public Client create(@RequestBody Client client) {
        return this.clientService.create(client);
    }
}
