package ma.ensa.nationaltransfermicroservicetransfer.dto;

import ma.ensa.nationaltransfermicroservicetransfer.enums.FeesType;
import ma.ensa.nationaltransfermicroservicetransfer.enums.TransferStatus;
import ma.ensa.nationaltransfermicroservicetransfer.enums.TransferType;

public class CreateTransferDto {
    public String id;
    public TransferType transferType;
    public Double amount;
    public TransferStatus status;
    public TransferClient sender;
    public TransferClient recipient;
    public FeesType feesType;

    public class TransferClient {
        public TransferClientType type;
        public String id;
    }
    public enum TransferClientType {
        CLIENT,
        PROSPECT
    }
}
