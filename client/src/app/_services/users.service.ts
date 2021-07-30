import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser } from '../_models/LoggedUser';
import { NewUser } from '../_models/NewUser';
import { UpdateUser } from '../_models/UpdateUser';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: LoggedUser = JSON.parse(localStorage.getItem('user'));
  baseUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsers () {
    return this.http.get<User[]>(this.baseUrl+'users',{headers: {Authorization: `Bearer ${this.user.token}`}});
  }

  getUser (id: number) {
    return this.http.get<UpdateUser>(this.baseUrl+'users/show/'+id,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl+'users/delete/'+id,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
  
  storeUser(model: NewUser) {
    return this.http.post(this.baseUrl+'users/store',model,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
  
  updateUser(model: UpdateUser) {
    return this.http.put(this.baseUrl+'users/update',model,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
}
