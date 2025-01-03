package ma.ensa.nationaltransfermicroservicetransfer.services;

import ma.ensa.nationaltransfermicroservicetransfer.dao.SupervisorDAO;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Supervisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupervisorService {
    private SupervisorDAO supervisorDAO;

    @Autowired
    public void setSupervisorDAO(SupervisorDAO supervisorDAO) {
        this.supervisorDAO = supervisorDAO;
    }

    public Supervisor create(Supervisor supervisor) {
        return this.supervisorDAO.save(supervisor);
    }
}
