import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/_models/NewUser';
import { AccountService } from 'src/app/_services/account.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  model: NewUser = {firstname: null,lastname: null,email: null,password:null};
  constructor(private usersService: UsersService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  storeUser() {
    this.usersService.storeUser(this.model).subscribe(user => {
      this.router.navigateByUrl('/dashboard/users');
      this.toastr.success('Added Successfully');
    });
  }

}
