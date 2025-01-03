package ma.ensa.nationaltransfermicroservicetransfer.models;

public class ClientModel {
    private String id;
    private Wallet wallet;

    public ClientModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }
}
