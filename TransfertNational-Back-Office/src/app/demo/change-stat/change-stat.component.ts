import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-stat',
  templateUrl: './change-stat.component.html',
  styleUrls: ['./change-stat.component.css']
})
export class ChangeStatComponent implements OnInit, AfterViewInit {

  submitted = false;
  erreur : any = "";
  statusForm !: FormGroup;

  @Input() stat : number = 0;

  status : string[]=[
    "A_servir",
    "Servie",
    "Extourner",
    "Restituer",
    "Bloquer",
    "Debloquer",
    "Desherencer"
  ]
  invalidStatus()
  {
  	return (this.submitted && this.statusForm.controls['status'].errors != null);
  }

  invalidMotif()
  {
  	return (this.submitted && this.statusForm.controls['motif'].errors != null);
  }
  constructor( private formBuilder : FormBuilder ,    private messageService:MessageService
    ) { }

  ngOnInit(): void { 
    this.statusForm = this.formBuilder.group({
      status: [this.status[this.stat - 1], Validators.required],
      motif: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if(this.stat != 0){
      var select : any = document.getElementById("status-select");
      select.value = this.status[this.stat - 1];
    }
  }

  onSubmit(){
    this.submitted=true;
    if( this.statusForm.invalid == true ){
      return;
    } else {
      //console.log(this.statusForm.value);
      //window.location.reload();
    }
    };

}
