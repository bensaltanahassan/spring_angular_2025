import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
   

    constructor(public layoutService: LayoutService) {}

    ngOnInit(): void {
       
    }
}
