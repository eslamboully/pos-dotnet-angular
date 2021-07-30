import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	user: User = {id: null,firstName: null,lastName: null,email: null};
	toggleChat: boolean = true;
	toggleSingle: boolean = true;
	
	constructor(private accountService: AccountService,private toastr: ToastrService) { }
	
	ngOnInit(): void {
		this.getUser();
	}
	
	
	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}

	logout() {
		this.accountService.logout();
		this.toastr.success("Success Logout Process");
	}

	getUser() {
		var user = JSON.parse(localStorage.getItem('user'));
		this.user = user;
	}

}
