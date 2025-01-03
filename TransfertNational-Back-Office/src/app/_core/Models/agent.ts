
export class Agent {
    title ?: string;
    id_agent?: number;
    firstName?: string;
    lastName?: string;
    idCard?: string;
    phoneNumber?: string;
    birthday?: Date;
    email?: string;
    address ?: String; 
    city ?: String;
    country ?: String;
    zipCode ?:String;
    solde ?: Solde[];
}

class Solde{
        id ?: string;
        createdAt ?: Date;
        updatedAt ?: Date;
        total_amount ?: number;
    }


export class Client {
    title ?: string;
    id?: number;
    firstName?: string;
    lastName?: string;
    validity_of_IDCard?:boolean;
    type_idcard?:string;
    idCard?: string;
    phoneNumber?: string;
    birthday?: Date;
    email?: string;
    address ?: String; 
    city ?: String;
    country ?: String;
    zipCode ?:String;
    password ?:String;
    role ?: String;
    created_at?:Date;
    compte?:Compte[];
    beneficiaires ?: Beneficiaire[];
}


export class Compte{
    id ?: string;
    createdAt ?: Date;
    numero ?: string;
    solde ?: number;
}

export class Beneficiaire{
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    account_number?: string;
}