package ma.ensa.nationaltransfermicroservicesirone.Entities;

import javax.persistence.*;

import java.util.List;

@Entity
public class Supervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long supervisorId;

    @OneToMany(mappedBy="supervisor")
    private List<BlacklistedClient> blacklistedClients;

    public Supervisor() {
    }

    public List<BlacklistedClient> getBlacklistedClients() {
        return blacklistedClients;
    }

    public void setBlacklistedClients(List<BlacklistedClient> blacklistedClients) {
        this.blacklistedClients = blacklistedClients;
    }

    public Long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(Long supervisorId) {
        this.supervisorId = supervisorId;
    }
}
