package ma.ensa.nationaltransfermicroservicetransfer.entities;

import javax.persistence.*;

import java.util.List;

@Entity
public class Client {
    @Id
    private String clientId;

    public Client() {
    }

    public Client(String clientId) {
        this.clientId = clientId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
