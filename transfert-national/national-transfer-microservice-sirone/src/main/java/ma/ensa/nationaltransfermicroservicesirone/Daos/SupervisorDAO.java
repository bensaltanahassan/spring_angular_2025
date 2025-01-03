package ma.ensa.nationaltransfermicroservicesirone.Daos;

import javax.transaction.Transactional;
import ma.ensa.nationaltransfermicroservicesirone.Entities.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface SupervisorDAO extends JpaRepository<Supervisor, Long> {
}
