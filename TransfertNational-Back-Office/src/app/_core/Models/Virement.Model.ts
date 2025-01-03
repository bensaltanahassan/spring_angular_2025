import { Account } from './Compte.Model';

    export class Virement {
        id_virm?: number;
        totalAmount?: number;
        accountNumber?: string;
        transferDate?: Date;
        reason?: string;
    }


    export class VirementMultiple extends Virement{
        static recipientCount : number;
        multipleTransferRecipients?: VirementMultipleBeneficiaire[]
    }


    export class VirementMultipleBeneficiaire {
        accountNumber?: string;
        amount?: number;
    }
