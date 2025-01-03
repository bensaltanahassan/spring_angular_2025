package ma.ensa.nationaltransfermicroservice.Entity;


import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Wallet")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private Float balance;
    private Float transferCeiling;
    private Float dailyCeiling;
    private LocalDateTime creationDate;

    public Wallet(String number,
                  Float balance,
                  Float transferCeiling,
                  Float dailyCeiling,
                  LocalDateTime creationDate) {
        this.number = number;
        this.balance = balance;
        this.transferCeiling = transferCeiling;
        this.dailyCeiling = dailyCeiling;
        this.creationDate = creationDate;
    }
}
