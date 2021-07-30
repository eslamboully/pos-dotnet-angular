import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateUser } from 'src/app/_models/UpdateUser';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  model: UpdateUser = {id: null,firstName: null,lastName: null,email: null};
  constructor(private usersService: UsersService,private router:Router,private toastr: ToastrService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.getUser();
  }

  updateUser() {
    this.usersService.updateUser(this.model).subscribe(user => {
      this.router.navigateByUrl('/dashboard/users');
      this.toastr.success('Updated Successfully');
    });
  }

  getUser() {
    var userId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getUser(userId).subscribe(user => {
      this.model = user;
    });
  }

}
