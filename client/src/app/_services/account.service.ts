import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../_models/LoginUser';
import { map } from 'rxjs/operators';
import { LoggedUser } from '../_models/LoggedUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl :string = environment.apiUrl;
  private currentUserSource = new ReplaySubject<LoggedUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private router: Router) { }

  login(user: any) {
    return this.http.post(this.baseUrl+"account/login",user).pipe(
      map((user: LoggedUser) => {
        if (user) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(user: any) {
    return this.http.post(this.baseUrl + 'account/register',user).pipe(
      map((user: LoggedUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); 
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: LoggedUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('dashboard/login');
  }
}
