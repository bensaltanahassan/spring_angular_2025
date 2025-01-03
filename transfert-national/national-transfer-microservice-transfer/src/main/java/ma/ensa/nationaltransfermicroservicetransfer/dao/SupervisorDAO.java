package ma.ensa.nationaltransfermicroservicetransfer.dao;

import ma.ensa.nationaltransfermicroservicetransfer.entities.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupervisorDAO extends JpaRepository<Supervisor, Long> {

}
