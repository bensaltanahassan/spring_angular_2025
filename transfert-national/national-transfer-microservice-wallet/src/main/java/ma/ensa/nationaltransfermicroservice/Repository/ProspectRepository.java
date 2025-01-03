package ma.ensa.nationaltransfermicroservice.Repository;

import ma.ensa.nationaltransfermicroservice.Entity.Prospect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProspectRepository extends JpaRepository<Prospect, String> {
}
