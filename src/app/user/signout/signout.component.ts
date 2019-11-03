import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignOutComponent implements OnInit {

  public user: User;

  constructor(userService: UserService) {
    this.user = userService.getProfile();
  }

  ngOnInit() {
  }

}
