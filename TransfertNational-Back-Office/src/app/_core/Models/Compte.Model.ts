import { Virement, VirementMultiple } from './Virement.Model';
import { Client } from './utilisateur';

export class Role {
    id?: number;
    roleName?: string;
}


export class Account {
    id?:number;
    number?: string;
    title?: string;
    status?: string;
    balance?: number;
    multipleTransfer?: VirementMultiple[];
}


export class Benificiaire {
    client?:Client;
    nom?:string;
    prenom?:string;
    numeroCompte?:string
}