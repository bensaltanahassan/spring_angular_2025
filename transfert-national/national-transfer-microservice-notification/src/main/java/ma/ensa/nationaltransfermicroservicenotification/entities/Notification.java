//package ma.ensa.nationaltransfermicroservicenotification.entities;
//
//import ma.ensa.nationaltransfermicroservicenotification.entities.enums.NotificationType;
//
//import javax.persistence.*;
//
//@Entity
//public class Notification {
//    @Id
//    private Long id;
//
//    private String message;
//
//
//    @Enumerated(EnumType.STRING)
//    private NotificationType notificationType;
//
//    public Notification() {
//    }
//
//    public Notification(Long id, String message, NotificationType notificationType) {
//        this.id = id;
//        this.message = message;
//        this.notificationType = notificationType;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public NotificationType getNotificationType() {
//        return notificationType;
//    }
//
//    public void setNotificationType(NotificationType notificationType) {
//        this.notificationType = notificationType;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getId() {
//        return id;
//    }
//}
