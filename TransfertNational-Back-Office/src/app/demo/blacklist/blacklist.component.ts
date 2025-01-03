import { Component, OnInit } from '@angular/core';
import { BlackList } from '../../_core/Models/BlackList';
import { BlacklistService } from '../../_core/services/blacklist.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css'],
})
export class BlacklistComponent implements OnInit {
  Clients: BlackList[] = [];
  cols: any[] = [];


  constructor(
    private blackService: BlacklistService,
    private messageService:MessageService ) {


    this.getClients();
    // this.Clients = [
    //   {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     phoneNumber: '123-456-7890',
    //     email: 'john.doe@example.com',
    //     createdAt: new Date('2023-01-01T00:00:00.000Z'),
    //   },
    // ];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Nom Complet' },
      { field: 'motif', header: 'Motif' },
      { field: 'phoneNumber', header: 'Numéro de téléphone' },
      { field: 'email', header: 'Email' },
      { field: 'createdAt', header: 'Bloquée le' },
  ];

  }

  getClients() {
    this.blackService.getAll().subscribe(
      (data: any) => {
        this.Clients = data;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });

      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.message, life: 3000 });

        // console.log(error);
        // this.messageService.add
      }
    );
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}
}
