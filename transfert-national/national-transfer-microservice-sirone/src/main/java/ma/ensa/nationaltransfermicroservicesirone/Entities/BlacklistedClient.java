package ma.ensa.nationaltransfermicroservicesirone.Entities;

import javax.persistence.*;
import org.springframework.lang.NonNull;

import java.util.Date;

@Entity
public class BlacklistedClient {

    @Id
    private String bclientId;
    @NonNull
    private Date blacklistingDate;
    @NonNull
    private String cause;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Supervisor supervisor;

    public BlacklistedClient() {
    }

    public BlacklistedClient(String bclientId, Date blacklistingDate, String cause, Supervisor supervisor) {
        this.bclientId = bclientId;
        this.blacklistingDate = blacklistingDate;
        this.cause = cause;
        this.supervisor = supervisor;
    }

    public void setBclientId(String bclient_id) {
        this.bclientId = bclient_id;
    }

    public String getBclientId() {
        return bclientId;
    }

    public Date getBlacklistingDate() {
        return blacklistingDate;
    }

    public void setBlacklistingDate(Date blacklistingDate) {
        this.blacklistingDate = blacklistingDate;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public Supervisor getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
    }
}
