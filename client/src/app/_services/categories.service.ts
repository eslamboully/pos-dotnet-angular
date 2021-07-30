import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/Category';
import { LoggedUser } from '../_models/LoggedUser';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  user: LoggedUser = JSON.parse(localStorage.getItem('user'));
  baseUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getCategories () {
    return this.http.get<Category[]>(this.baseUrl+'categories',{headers: {Authorization: `Bearer ${this.user.token}`}});
  }

  getCategory (id: number) {
    return this.http.get<Category>(this.baseUrl+'categories/show/'+id,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl+'categories/delete/'+id,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
  
  storeCategory(model: Category) {
    return this.http.post(this.baseUrl+'categories/store',model,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
  
  updateCategory(model: Category) {
    return this.http.put(this.baseUrl+'categories/update',model,{headers: {Authorization: `Bearer ${this.user.token}`}});
  }
}
