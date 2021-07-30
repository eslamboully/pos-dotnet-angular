import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginUser } from '../_models/LoginUser';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginUser = {email: null,password:null};
  constructor(private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  login() {
    this.accountService.login(this.model).subscribe((user) => {
      this.router.navigateByUrl('/dashboard');
    });
  }

  

}
