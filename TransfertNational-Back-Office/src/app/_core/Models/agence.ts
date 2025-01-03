import {Agent} from './agent'
import {Client} from './utilisateur'

export class Agency {
    title ?: string;
    agents ?: Agent[]; 
    clients ?: Client[];
}