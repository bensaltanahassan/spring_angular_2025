package ma.ensa.nationaltransfermicroservice.controller;

import ma.ensa.nationaltransfermicroservice.Entity.Client;
import ma.ensa.nationaltransfermicroservice.Entity.Prospect;
import ma.ensa.nationaltransfermicroservice.service.ProspectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("api/prospect")
@Controller
public class ProspectController {
    private ProspectService prospectService;

    @Autowired
    public void setProspectService(ProspectService prospectService) {
        this.prospectService = prospectService;
    }

    @PostMapping("/create")
    public ResponseEntity<Prospect> saveProspect(@RequestBody Prospect prospect) {
        return new ResponseEntity<>(this.prospectService.createProspect(prospect), HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Prospect> findProspectById(@PathVariable String id) {
        Optional<Prospect> prospect =  this.prospectService.findProspectById(id);
        return prospect.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }
}
