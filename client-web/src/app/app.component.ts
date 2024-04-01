import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { user } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  userdata: user[][] = [];
  length: any = 0;
  index: any = 0;
  paginationLength: any = 0;
  pagination_userdata: user[] = [];
  constructor(private title: Title, private userService: UserService) {
    this.setDynamicTitle();
  }

  ngOnInit(): void {
    this.userService
      .fetchUserData()
      .then((data: user[][]) => {
        this.userdata = data;
        this.pagination_userdata = this.userdata[this.index];
        this.length = this.userService.length;
        this.paginationLength = this.userService.length / 20;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }
  setPaginatedData(index: any) {
    this.index = index;
    this.pagination_userdata = this.userdata[index];
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setDynamicTitle() {
    this.setTitle('Task');
  }

  range(start: number, end: number): number[] {
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  }
}
