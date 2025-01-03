export class Transfer{
    id_transfer ?: number;
    code_pin ?: String;
    received_at ?: Date;
    receiver_fname !: String;
    receiver_lname !: String;
    receiver_phnumber !: String;
    transfer_amount !: number;
    transfer_reference ?: String;
    transfer_status ?: number;
    motif ?: string;
}

export class MultiTransfer{

    id_client ?: number;
    sender_fname !: String;
    sender_lname !: String;
    sender_phnumber !: String;

    id_multitransfer ?: number;
    transfers !: Transfer[];
    created_at ?: Date;
    ended_at ?: Date;
    expense_id ?: number;
    motif !: String;

    notify_transfer !: boolean;

    request_by_prospect_client !: boolean;
    sended_by_agent !: number;
    transfer_by_cash !: boolean;

    total_amount !: number;
    total_expense_amount !: number;
}