package ma.ensa.nationaltransfermicroservicesirone.Services;

import ma.ensa.nationaltransfermicroservicesirone.Daos.BlacklistedClientDAO;
import ma.ensa.nationaltransfermicroservicesirone.Entities.BlacklistedClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SironService {

    private final BlacklistedClientDAO blacklistedClientDAO;


    public SironService(BlacklistedClientDAO blacklistedClientDAO) {
        this.blacklistedClientDAO = blacklistedClientDAO;
    }


    public boolean checkBlacklist(String id) {
        Optional<BlacklistedClient> blacklistedClient = blacklistedClientDAO.findById(id);
        return blacklistedClient.isPresent();
    }

    public void addBlacklistedClient(BlacklistedClient client) {
        blacklistedClientDAO.save(client);
    }

    public void removeBlacklistedCLient(BlacklistedClient client) {
        blacklistedClientDAO.delete(client);
    }
}
