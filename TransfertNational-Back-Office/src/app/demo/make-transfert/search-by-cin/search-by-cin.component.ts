import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { utilisateur } from '../../../_core/Models/utilisateur';

@Component({
  selector: 'app-search-by-cin',
  templateUrl: './search-by-cin.component.html',
  styleUrls: ['./search-by-cin.component.css'],
})
export class SearchByCinComponent implements OnInit {
  show_user_infos: boolean = false;
  submitted = false;
  erreur: any = {};
  search_cin!: FormGroup;

  user: utilisateur = {
    firstName: 'houssam',
    lastName: 'el aich',
    IDCard: 'EE55555',
    phoneNumber: '06555555555',
    birthday: new Date(),
    joiningDate: new Date(),
    email: 'eeeee.llll@ffff.cc',
  };

  constructor(private formBuilder: FormBuilder) {}

  invalidcin() {
    return (
      this.submitted &&
      (this.search_cin.controls['cin'].errors != null ||
        this.erreur.compte != null)
    );
  }

  ngOnInit(): void {
    this.search_cin = this.formBuilder.group({
      cin: ['', Validators.required],
      montant: ['', Validators.required],
    });
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.submitted = true;
    this.show_user_infos = true;
  }

  set_show_user_infos(show_user_infos: boolean) {
    this.show_user_infos = show_user_infos;
  }
}
