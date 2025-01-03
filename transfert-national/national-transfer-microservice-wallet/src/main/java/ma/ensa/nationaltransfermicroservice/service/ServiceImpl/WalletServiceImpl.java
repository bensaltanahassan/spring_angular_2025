package ma.ensa.nationaltransfermicroservice.service.ServiceImpl;

import ma.ensa.nationaltransfermicroservice.Entity.Client;
import ma.ensa.nationaltransfermicroservice.Entity.Wallet;
import ma.ensa.nationaltransfermicroservice.Repository.WalletRepository;
import ma.ensa.nationaltransfermicroservice.exception.WalletNotFoundException;
import ma.ensa.nationaltransfermicroservice.service.WalletService;
import ma.ensa.nationaltransfermicroservice.utility.GenerateWalletNumber;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {

    private  final  WalletRepository walletRepository;

    public WalletServiceImpl(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    @Override
    public Wallet CreateWallet(Wallet wallet) {
        wallet.setNumber(GenerateWalletNumber.generateWalletNumber());
        wallet.setCreationDate(LocalDateTime.now());
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet UpdateWalletBalance(Long Id, Float Sold) throws WalletNotFoundException {
        Wallet wallet=walletRepository.findWalletById(Id).orElseThrow(()->new WalletNotFoundException("the wallet doesn't exist"));
        Float existingBalance=wallet.getBalance();
        wallet.setBalance(Sold+existingBalance);
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findWalletByWallet_Number(String Wallet_Number) throws WalletNotFoundException {
        return walletRepository.findWalletByNumber(Wallet_Number).orElseThrow(()->new WalletNotFoundException("the wallet doesn't exist"));
    }

//    @Override
//    public Wallet findWalletByClientId(Long ClientId) throws WalletNotFoundException {
//        return walletRepository.findWalletByClientId(ClientId).orElseThrow(()->new WalletNotFoundException("the Wallet doesn't exist"));
//    }

    @Override
    public List<Wallet> findAllWallets() {
        return walletRepository.findAll();
    }

    @Override
    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }

    @Override
    public Wallet debit_balance(Long id, Float Amount) throws WalletNotFoundException {
        Wallet wallet=walletRepository.findWalletById(id)
                .orElseThrow(
                        ()->new WalletNotFoundException("the wallet doesn't exist")
                );
        Float OldBalance= wallet.getBalance();
        wallet.setBalance(OldBalance-Amount);
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet credit_balance(Long id, Float Amount) throws WalletNotFoundException {
        Wallet wallet=walletRepository.findWalletById(id).orElseThrow(()->new WalletNotFoundException("the wallet doesn't exsit"));
        Float TransferCeiling=wallet.getTransferCeiling();
        Float DailyCeiling=wallet.getDailyCeiling();
        Float OldBalance=wallet.getBalance();
        wallet.setBalance(OldBalance+Amount);
        wallet.setTransferCeiling(TransferCeiling+Amount);
        wallet.setDailyCeiling(DailyCeiling+Amount);
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet debitBalance(Long id, Float amount) {
        Optional<Wallet> optWallet = walletRepository.findWalletById(id);
        if (optWallet.isPresent()) {
            Wallet wallet = optWallet.get();
            wallet.setBalance(wallet.getBalance() - amount);
            return walletRepository.save(wallet);
        } else {
            throw new RuntimeException("Wallet not found");
        }
    }

    @Override
    public Wallet creditBalance(Long id, Float amount) {
        Optional<Wallet> optWallet = walletRepository.findWalletById(id);
        if (optWallet.isPresent()) {
            Wallet wallet = optWallet.get();
            wallet.setBalance(wallet.getBalance() + amount);
            return walletRepository.save(wallet);
        } else {
            throw new RuntimeException("Wallet not found");
        }
    }

//    @Override
//    public Float findWalletBalanceByClientId(Long clientId) {
//        Client client = new Client();
//        client.setId(clientId);
//        return this.walletRepository.findWalletBalanceByClient(client);
//    }

}
