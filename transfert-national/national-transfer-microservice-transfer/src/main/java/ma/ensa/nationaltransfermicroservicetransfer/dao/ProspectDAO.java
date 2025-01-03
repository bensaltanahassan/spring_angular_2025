package ma.ensa.nationaltransfermicroservicetransfer.dao;

import ma.ensa.nationaltransfermicroservicetransfer.entities.Prospect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProspectDAO extends JpaRepository<Prospect, String> {
}
