package ma.ensa.nationaltransfermicroservicenotification.utils;

public record EmailDetails (
        String recipient,
        String msgBody,
        String subject,
        String attachment
) { }
