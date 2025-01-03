package ma.ensa.nationaltransfermicroservicetransfer.web;

import ma.ensa.nationaltransfermicroservicetransfer.entities.Supervisor;
import ma.ensa.nationaltransfermicroservicetransfer.services.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("supervisors")
@RestController
public class SupervisorController {
    private SupervisorService supervisorService;

    @Autowired
    public void setSupervisorService(SupervisorService supervisorService) {
        this.supervisorService = supervisorService;
    }

    @PostMapping("/create")
    public Supervisor create(@RequestBody Supervisor supervisor) {
        return this.supervisorService.create(supervisor);
    }
}
