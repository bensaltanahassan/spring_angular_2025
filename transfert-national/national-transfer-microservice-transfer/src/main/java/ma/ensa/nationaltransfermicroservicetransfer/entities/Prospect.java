package ma.ensa.nationaltransfermicroservicetransfer.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Prospect {
    @Id
    private String id;

    public Prospect() {
    }

    public Prospect(String id) {
        this.id = id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
