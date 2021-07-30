import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: "full"},
  {path: 'dashboard', component: AdminComponent,canActivate: [AuthGuard], 
    children : [
      {path: '',component: IndexComponent},
      // users paths
      {path: 'users',component: UserListComponent},
      {path: 'users/add',component: UserAddComponent},
      {path: 'users/:id/edit',component: UserEditComponent},
      // categories paths
      {path: 'categories',component: CategoriesListComponent},
      {path: 'categories/add', component: CategoriesAddComponent},
      {path: 'categories/:id/edit',component: CategoriesEditComponent}
    ]
  },
  {path: 'dashboard/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
