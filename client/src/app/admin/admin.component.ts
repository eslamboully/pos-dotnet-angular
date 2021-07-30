import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;

    constructor(public sharedService: SharedService) {
      
    }
  ngOnInit(): void {
  }

}
