import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if(error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                
                // throw modalStateErrors;
                modalStateErrors.forEach(err => {
                  this.toastr.error(err);
                });
              } else {
                this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              this.toastr.error(error.error, error.status);  
              break;
            case 404:
              this.router.navigateByUrl('/dashboard');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/dashboard', navigationExtras);
              break;
            default: 
              this.toastr.error('Something unexpected went wrong');
              console.log(error) ;
              break;  
          }
        }

        return throwError(error);
      })
    )
  }
}
