package ma.ensa.nationaltransfermicroservicetransfer.services;

import ma.ensa.nationaltransfermicroservicetransfer.dao.ClientDAO;
import ma.ensa.nationaltransfermicroservicetransfer.dao.ProspectDAO;
import ma.ensa.nationaltransfermicroservicetransfer.dao.TransferDAO;
import ma.ensa.nationaltransfermicroservicetransfer.dto.CreateTransferDto;
import ma.ensa.nationaltransfermicroservicetransfer.dto.UpdateStatusDTO;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Client;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Prospect;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Transfer;
import ma.ensa.nationaltransfermicroservicetransfer.enums.FeesType;
import ma.ensa.nationaltransfermicroservicetransfer.enums.TransferStatus;
import ma.ensa.nationaltransfermicroservicetransfer.enums.TransferType;
import ma.ensa.nationaltransfermicroservicetransfer.models.ClientModel;
import ma.ensa.nationaltransfermicroservicetransfer.models.ProspectModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Optional;

@Service
public class TransferService {
    private static final Long TRANSFERFEE = 10L;

    private TransferDAO transferDAO;
    private ClientDAO clientDAO;
    private ProspectDAO prospectDAO;

    private final RestTemplate restTemplate;

    public TransferService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Autowired
    public void setTransferDAO(TransferDAO transferDAO) {
        this.transferDAO = transferDAO;
    }

    @Autowired
    public void setClientDAO(ClientDAO clientDAO) {
        this.clientDAO = clientDAO;
    }

    @Autowired
    public void setProspectDAO(ProspectDAO prospectDAO) {
        this.prospectDAO = prospectDAO;
    }
    //    public Transfer create(Transfer transfer) {
//        return this.transferDAO.save(transfer);
//    }

    public Optional<Transfer> findById(String id) {
        return this.transferDAO.findById(id);
    }

    // needs some clean-up
    public Transfer create(CreateTransferDto ctDto) {
        Transfer transfer = new Transfer();
        transfer.setTransferId(ctDto.id);

        if (ctDto.sender.type.equals(CreateTransferDto.TransferClientType.CLIENT)) {

            ClientModel sender = restTemplate.getForObject(
                    "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/client/find/" + ctDto.sender.id, ClientModel.class);

            checkValidity(ctDto, sender);
            clientDAO.save(new Client(sender.getId()));

            transfer.setAmount(ctDto.amount);
            transfer.setTransfer_date(new Date());
            transfer.setStatus(TransferStatus.PENDING);
            transfer.setSenderClient(new Client(ctDto.sender.id));

            if (ctDto.recipient.type.equals(CreateTransferDto.TransferClientType.CLIENT)) {

                ClientModel recipient = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/client/find/" + ctDto.recipient.id, ClientModel.class);

                if (recipient == null) {
                    throw new RuntimeException("Recipient client not found");
                }
                clientDAO.save(new Client(recipient.getId()));

                transfer.setRecipientClient(new Client(ctDto.recipient.id));
            } else {

                ProspectModel recipient = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/prospect/find/" + ctDto.recipient.id, ProspectModel.class);

                if (recipient == null) {
                    throw new RuntimeException("Recipient client not found");
                }
                prospectDAO.save(new Prospect(recipient.getId()));

                transfer.setRecipientProspect(new Prospect(ctDto.recipient.id));
            }

            if (ctDto.transferType.equals(TransferType.DEBIT)) {
                Long fee;
                if (ctDto.feesType.equals(FeesType.ORDERINGCLIENT)) {
                    fee = TRANSFERFEE;
                } else if (ctDto.feesType.equals(FeesType.BENEFITINGCLIENT)) {
                    fee = 0L;
                } else {
                    fee = TRANSFERFEE / 2;
                }

                restTemplate.put("http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/wallet/debit/" + sender.getWallet().getId(),
                        ctDto.amount + fee);
            }

            return transferDAO.save(transfer);

        } else {

            ProspectModel sender = restTemplate.getForObject(
                    "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/prospect/find/" + ctDto.sender.id, ProspectModel.class);

            if (sender == null) {
                throw new RuntimeException("Sender not found");
            }

            prospectDAO.save(new Prospect(sender.getId()));
            transfer.setAmount(ctDto.amount);
            transfer.setTransfer_date(new Date());
            transfer.setStatus(TransferStatus.PENDING);
            transfer.setSenderProspect(new Prospect(sender.getId()));

            if (ctDto.recipient.type.equals(CreateTransferDto.TransferClientType.CLIENT)) {
                ClientModel recipient = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/client/find/" + ctDto.recipient.id, ClientModel.class);

                if (recipient == null) {
                    throw new RuntimeException("Recipient client not found");
                }
                clientDAO.save(new Client(recipient.getId()));

                transfer.setRecipientClient(new Client(ctDto.recipient.id));
            } else {
                ProspectModel recipient = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/prospect/find/" + ctDto.recipient.id, ProspectModel.class);

                if (recipient == null) {
                    throw new RuntimeException("Recipient client not found");
                }
                prospectDAO.save(new Prospect(recipient.getId()));

                transfer.setRecipientProspect(new Prospect(ctDto.recipient.id));
            }

            return transferDAO.save(transfer);
        }
    }

    private void checkValidity(CreateTransferDto ctDto, ClientModel sender) {
        if (sender == null) {
            throw new RuntimeException("Sender client not found");
        }

        if (sender.getWallet().getTransferCeiling() < ctDto.amount) {
            throw new RuntimeException("Transfer cap surpassed");
        }

        if (ctDto.transferType.equals(TransferType.DEBIT) && sender.getWallet().getBalance() < ctDto.amount) {
            throw new RuntimeException("Net enough balance");
        }

        // get today's date at midnight
        Calendar today = new GregorianCalendar();
        today.set(Calendar.HOUR_OF_DAY, 0);
        today.set(Calendar.MINUTE, 0);
        today.set(Calendar.SECOND, 0);
        today.set(Calendar.MILLISECOND, 0);
        Client client = new Client(sender.getId());
        Double dailyTransfersSum = this.transferDAO.getTranferSumBySenderAndStartingDate(client, today.getTime());
        if (dailyTransfersSum == null) {
            dailyTransfersSum = 0d;
        }

        if (dailyTransfersSum + ctDto.amount > sender.getWallet().getDailyCeiling()) {
            throw new RuntimeException("Daily cap surpassed");
        }
    }

    public Transfer update(UpdateStatusDTO updateStatusDTO) {
        Optional<Transfer> transfer = transferDAO.findById(updateStatusDTO.getId());

        if (transfer.isEmpty()) {
            throw new RuntimeException("Transfer not found");
        } else if (
                transfer.get().getStatus().equals(updateStatusDTO.getTransferStatus()) ||
                transfer.get().getStatus().equals(TransferStatus.COMPLETED) ||
                transfer.get().getStatus().equals(TransferStatus.FAILED) ||
                transfer.get().getStatus().equals(TransferStatus.EXPIRED) ||
                transfer.get().getStatus().equals(TransferStatus.CANCELED)
        ) {
          throw new RuntimeException("Transfer closed and can't be modified");
        } else if (
            updateStatusDTO.getTransferStatus().equals(TransferStatus.CANCELED) ||
            updateStatusDTO.getTransferStatus().equals(TransferStatus.FAILED) ||
            updateStatusDTO.getTransferStatus().equals(TransferStatus.EXPIRED)
        ) {
            if (transfer.get().getSenderClient() != null){
                ClientModel sender = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/client/find/" + transfer.get().getSenderClient().getClientId(), ClientModel.class);

                if (sender == null) {
                    throw new RuntimeException("Sender not found");
                }

                restTemplate.put("http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/wallet/credit/" + sender.getWallet().getId(),
                        transfer.get().getAmount());
            }

        } else if(updateStatusDTO.getTransferStatus() == TransferStatus.COMPLETED) {

            if(transfer.get().getRecipientClient() != null) {
                ClientModel recipient = restTemplate.getForObject(
                        "http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/client/find/" + transfer.get().getRecipientClient().getClientId(), ClientModel.class);

                if (recipient == null) {
                    throw new RuntimeException("Recipient not found");
                }

                restTemplate.put("http://NATIONAL-TRANSFER-MICROSERVICE-WALLET/api/wallet/credit/" + recipient.getWallet().getId(),
                        transfer.get().getAmount());

            }
        }

        transfer.get().setStatus(updateStatusDTO.getTransferStatus());
        return transferDAO.save(transfer.get());
    }
}
