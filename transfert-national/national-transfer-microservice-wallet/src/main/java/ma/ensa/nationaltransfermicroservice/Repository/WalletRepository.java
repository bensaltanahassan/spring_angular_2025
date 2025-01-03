package ma.ensa.nationaltransfermicroservice.Repository;

import ma.ensa.nationaltransfermicroservice.Entity.Client;
import ma.ensa.nationaltransfermicroservice.Entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
    Optional<Wallet> findWalletById(Long id);
    Optional<Wallet> findWalletByNumber(String Number);
//    Optional<Wallet> findWalletByClientId(Long Client);

//    @Query("SELECT w.balance from Wallet w where w.client = :client")
//    Float findWalletBalanceByClient(Client client);
}
