import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClientDataService } from '../../_core/services/client-data.service';
import { BlacklistService } from '../../_core/services/blacklist.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  Client : any;

  bloque : boolean = false;
  ishide : boolean = false;
     
  constructor( private route : ActivatedRoute, private blackListService : BlacklistService, private clientService : ClientDataService,private messageService:MessageService
    ) { }


  ngOnInit(): void {
    // this.Client={
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   phoneNumber: '123-456-7890',
    //   email: 'john.doe@example.com',
    //   createdAt: new Date('2023-01-01T00:00:00.000Z'),
    // }
    this.bloque = false;
    
    this.route.params.subscribe((params) => {
      this.clientService.getClientByCin(params["cin"]).subscribe((val) => {
        this.Client = val;
        var user : any = {};
        user.firstName = this.Client.firstName;
        user.lastName = this.Client.lastName;
        user.phoneNumber = this.Client.phoneNumber;
        this.blackListService.checkIfClientBlocked(user).subscribe((val) => {
          this.bloque = true;
        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });
          console.log(err);
        });
      }, (err) => {
        // alert(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });

      });
    })

  }
  
  debloquer(){
    this.blackListService.debloquer(this.Client.id).subscribe((res : any) => {
      this.bloque = false;
    }, (err : any) => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });

    })
    this.switchhide();
  }

  bloquer(){
    var user : any = {};
    user.firstName = this.Client.firstName;
    user.motif = "jdjdkj";
    user.lastName = this.Client.lastName;
    user.phoneNumber = this.Client.phoneNumber;
    user.email=this.Client.email;
    user.idClient= this.Client.id;
    this.blackListService.bloquer(user).subscribe((res : any) => {
      this.bloque = true;
    }, (err : any) => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.error, life: 3000 });

    })
    this.switchhide();
    
  }
switchhide () {
  this.ishide=!this.ishide;
}
}
