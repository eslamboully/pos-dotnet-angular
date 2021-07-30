import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { LoggedUser } from 'src/app/_models/LoggedUser';
import { UsersService } from 'src/app/_services/users.service';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/_models/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public userService:UsersService,private toastr: ToastrService,private translate: TranslateService) {
    userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // this.service.sortColumn = column;
    // this.service.sortDirection = direction;
  }

  destroy(id: number) {
    if (confirm("Are You Sure ?")) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id != id);
        this.toastr.success("Deleted Successfully");
      });
      
      
    }
  }

}
