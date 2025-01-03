package ma.ensa.nationaltransfermicroservicetransfer.services;

import ma.ensa.nationaltransfermicroservicetransfer.dao.ClientDAO;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private ClientDAO clientDAO;

    @Autowired
    public void setClientDAO(ClientDAO clientDAO) {
        this.clientDAO = clientDAO;
    }

    public Client create(Client client) {
        return this.clientDAO.save(client);
    }
}
