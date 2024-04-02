import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { user } from './model/user.model';
import { MyHttpService } from './services/http.service';

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
  constructor(
    private title: Title,
    private userService: UserService,
    private http: MyHttpService
  ) {
    this.setDynamicTitle();
  }

  ngOnInit(): void {
    this.http.getData('./../assets/heliverse_mock_data.json').subscribe((e) => {
      console.log(e);
    });

    this.userService.fetchUserData().subscribe((data: user[][]) => {
      this.userdata = data;
      this.pagination_userdata = this.userdata[this.index];
      this.length = this.userService.length;
      this.paginationLength = this.userService.length / 20;
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
  next() {
    this.index++;
    this.pagination_userdata = this.userdata[this.index];
  }
  previous() {
    this.index--;
    this.pagination_userdata = this.userdata[this.index];
  }
}
