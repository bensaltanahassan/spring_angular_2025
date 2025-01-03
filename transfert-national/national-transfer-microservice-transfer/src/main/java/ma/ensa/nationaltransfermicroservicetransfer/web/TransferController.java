package ma.ensa.nationaltransfermicroservicetransfer.web;

import ma.ensa.nationaltransfermicroservicetransfer.dto.CreateTransferDto;
import ma.ensa.nationaltransfermicroservicetransfer.dto.UpdateStatusDTO;
import ma.ensa.nationaltransfermicroservicetransfer.entities.Transfer;
import ma.ensa.nationaltransfermicroservicetransfer.services.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RequestMapping("api/transfer")
@RestController
public class TransferController {
    private TransferService transferService;

    @Autowired
    public void setTransferService(TransferService transferService) {
        this.transferService = transferService;
    }

//    @PostMapping("/create")
//    public Transfer create(@RequestBody Transfer transfer) {
//        return this.transferService.create(transfer);
//    }
    @PostMapping("/create")
    public ResponseEntity<Transfer> create(@RequestBody CreateTransferDto ctDto) {
        try {
            Transfer transfer = this.transferService.create(ctDto);
            return new ResponseEntity<>(transfer, HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/find/{id}")
    public Transfer findById(@PathVariable String id) {
        Optional<Transfer> transfer = this.transferService.findById(id);
        return transfer.orElse(null);
    }

    @PostMapping("update-status")
    public ResponseEntity<Object> transfer(@RequestBody UpdateStatusDTO updateStatusDTO) {
        try{
            this.transferService.update(updateStatusDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
