package ma.ensa.nationaltransfermicroservicesirone.Daos;

import javax.transaction.Transactional;
import ma.ensa.nationaltransfermicroservicesirone.Entities.BlacklistedClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface BlacklistedClientDAO extends JpaRepository<BlacklistedClient, String> {
}
