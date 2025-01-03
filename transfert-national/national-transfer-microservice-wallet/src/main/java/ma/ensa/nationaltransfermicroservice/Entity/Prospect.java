package ma.ensa.nationaltransfermicroservice.Entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Prospect {
    @Id
    private String id;
    private String firstName;
    private String LastName;
    private String phoneNumber;

    public Prospect(String firstName, String lastName, String phoneNumber) {
        this.firstName = firstName;
        LastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}