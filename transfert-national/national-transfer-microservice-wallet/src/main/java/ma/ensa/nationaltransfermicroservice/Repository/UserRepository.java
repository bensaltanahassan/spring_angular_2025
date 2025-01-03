package ma.ensa.nationaltransfermicroservice.Repository;

import ma.ensa.nationaltransfermicroservice.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
