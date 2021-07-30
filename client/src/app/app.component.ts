import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggedUser } from './_models/LoggedUser';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private accountService: AccountService,private translate: TranslateService) {}
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: LoggedUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
