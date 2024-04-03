import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { user } from '../../model/user.model';
@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
})
export class TeamHomeComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
}
