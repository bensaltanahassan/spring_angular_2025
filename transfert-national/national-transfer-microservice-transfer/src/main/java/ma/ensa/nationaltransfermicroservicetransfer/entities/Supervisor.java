package ma.ensa.nationaltransfermicroservicetransfer.entities;

import javax.persistence.*;
import ma.ensa.nationaltransfermicroservicetransfer.enums.SupervisorRole;

import java.util.List;

@Entity
public class Supervisor {
    @Id
    private long supervisorId;

    @Enumerated(EnumType.STRING)
    private SupervisorRole role;

    public Supervisor() {
    }

    public Supervisor(long supervisorId, SupervisorRole role) {
        this.supervisorId = supervisorId;
        this.role = role;
    }

    public long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(long supervisorId) {
        this.supervisorId = supervisorId;
    }

    public SupervisorRole getRole() {
        return role;
    }

    public void setRole(SupervisorRole role) {
        this.role = role;
    }
}
