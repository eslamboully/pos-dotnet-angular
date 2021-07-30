import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,private router: Router) { }
  isLogged: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.accountService.currentUser$.subscribe(
        user => {
          if (user) {
            this.isLogged = true;
          } else {
            this.isLogged = false;
          }
        }
      )
      
      if (this.isLogged) return true;
        this.router.navigateByUrl('/dashboard/login');
        return false;
  }
  
}
