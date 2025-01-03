import { Injectable } from '@angular/core';
import { MultiTransfer, Transfer } from '../Models/Transfer';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  multiTransfer: MultiTransfer = new MultiTransfer();
  sender_selected: boolean = false;

  constructor() {
    this.multiTransfer.transfers = [];
    this.multiTransfer.total_amount = 0;
    this.multiTransfer.total_expense_amount = 0;
    this.multiTransfer.notify_transfer = false;
  }

  transfer_byCash(motif: String, frais: number) {
    this.multiTransfer.transfer_by_cash = true;
    this.multiTransfer.motif = motif;
    this.multiTransfer.expense_id = frais;
  }

  transfer(motif: String, frais: number) {
    this.multiTransfer.transfer_by_cash = false;
    this.multiTransfer.motif = motif;
    this.multiTransfer.expense_id = frais;
  }

  ajouter(transfer: Transfer) {
    let verify = this.NameAlreadyExist(transfer);
    if (!verify.error) {
      verify = this.PhoneAlreadyUsed(transfer);
      if (!verify.error) {
        this.multiTransfer.transfers.push(transfer);
        this.multiTransfer.total_amount += transfer.transfer_amount;
        this.multiTransfer.total_expense_amount = Math.round(
          this.multiTransfer.total_amount * 0.05
        );
        return true;
      }
      return verify.message;
    }
    return verify.message;
  }

  supprimer(transfer: Transfer) {
    this.multiTransfer.transfers = this.multiTransfer.transfers.filter(
      (element: Transfer) => {
        return element != transfer;
      }
    );
    this.multiTransfer.total_amount -= transfer.transfer_amount;
    this.multiTransfer.total_expense_amount = Math.round(
      this.multiTransfer.total_amount * 0.05
    );
  }

  toggleNotitfication() {
    this.multiTransfer.notify_transfer = !this.multiTransfer.notify_transfer;
  }

  NameAlreadyExist(transfer: Transfer) {
    var someArr = this.multiTransfer.transfers.filter((val: any) => {
      if (
        val.receiver_fname == transfer.receiver_fname &&
        val.receiver_lname == transfer.receiver_lname
      ) {
        return val;
      }
      return null;
    });
    return { error: someArr.length != 0, message: 'Bénéficiare déjà cité!' };
  }

  PhoneAlreadyUsed(transfer: Transfer) {
    var someArr = this.multiTransfer.transfers.filter((val: any) => {
      if (val.receiver_phnumber == transfer.receiver_phnumber) {
        return val;
      }
      return null;
    });
    return {
      error: someArr.length != 0,
      message: 'Numéro de téléphone déjà utilisé!',
    };
  }
}
