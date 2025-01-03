package ma.ensa.nationaltransfermicroservicetransfer.dao;

import ma.ensa.nationaltransfermicroservicetransfer.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientDAO extends JpaRepository<Client, String> {

}
