import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientDataService } from '../../_core/services/client-data.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-afficher-info-client',
  templateUrl: './afficher-info-client.component.html',
  styleUrls: ['./afficher-info-client.component.css'],
})
export class AfficherInfoClientComponent implements OnInit {
  Clients: Array<any> = [];

  totalRecords?: any;
  recherche?: string;

  errorRecherche = '';
  cols: any[] = [];

  Pass(cin: number) {
    this.router.navigate(['clients-list/' + cin]);
  }

  constructor(
    private router: Router,
    private clientService: ClientDataService,
    private messageService:MessageService

  ) {
    this.getClients();
    // this.Clients = [
    //   {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     phoneNumber: '123-456-7890',
    //     email: 'john.doe@example.com',
    //     idCard:'1',
    //     createdAt: new Date('2023-01-01T00:00:00.000Z'),
    //   },
    // ];
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Nom Complet' },
      { field: 'idCard', header: 'CIN' },
      { field: 'phoneNumber', header: 'Numéro de téléphone' },
      { field: 'email', header: 'Email' },
    ];
  }

  getClients() {
    this.clientService.getAll().subscribe(
      (data2: any) => {
        this.Clients = data2;
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: "Done!", life: 3000 });

      },
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.error?.error, life: 3000 });

      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
