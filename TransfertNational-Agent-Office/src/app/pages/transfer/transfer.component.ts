import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {

  transfer_type !: FormGroup;

  transfers : any = [
    {name: 'Par débit' },
    {name: 'En espèce' },
  ];

  transfer_typeControl !: FormControl;
  transfer_type_value !: any;

  constructor(private formBuilder : FormBuilder,
    private router:Router,private _http: HttpClient) { }


  ngOnInit(): void {
    this.transfer_type = this.formBuilder.group({
      transfer_typeControl: [null, [Validators.required]],
    });
  }

  onChangeObj(type : any) {
    this.transfer_type_value = type;
  }

}
