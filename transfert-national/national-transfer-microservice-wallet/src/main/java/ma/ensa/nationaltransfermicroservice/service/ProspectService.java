package ma.ensa.nationaltransfermicroservice.service;

import ma.ensa.nationaltransfermicroservice.Entity.Client;
import ma.ensa.nationaltransfermicroservice.Entity.Prospect;
import ma.ensa.nationaltransfermicroservice.Repository.ProspectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProspectService {
    private ProspectRepository prospectRepository;

    @Autowired
    public void setProspectRepository(ProspectRepository prospectRepository) {
        this.prospectRepository = prospectRepository;
    }

    public Prospect createProspect(Prospect prospect) {
        return this.prospectRepository.save(prospect);
    }

    public Optional<Prospect> findProspectById(String id) {
        return this.prospectRepository.findById(id);
    }
}
