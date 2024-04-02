import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { user } from '../../model/user.model';
import { MyHttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  userdata: user[][] = [];
  length: any = 0;
  index: any = 0;
  paginationLength: any = 0;
  pagination_userdata: user[] = [];
  filtered_userdata: user[] = [];
  searchKeyword: string = '';
  constructor(private title: Title, private userService: UserService) {
    this.setDynamicTitle();
  }

  ngOnInit(): void {
    this.userService.fetchUserData().subscribe((data: user[][]) => {
      this.userdata = data;
      this.pagination_userdata = this.userdata[this.index];
      this.filtered_userdata = this.userdata[this.index];
      this.length = this.userService.length;
      this.paginationLength = this.userService.length / 20;
    });
  }
  setPaginatedData(index: any) {
    this.index = index;
    this.filtered_userdata = this.userdata[index];
    this.pagination_userdata = this.userdata[index];
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setDynamicTitle() {
    this.setTitle('Home');
  }
  next() {
    this.index++;
    this.filtered_userdata = this.userdata[this.index];
    this.pagination_userdata = this.userdata[this.index];
  }
  previous() {
    this.index--;
    this.filtered_userdata = this.userdata[this.index];
    this.pagination_userdata = this.userdata[this.index];
  }
  searchByName(keyword: string) {
    this.userService
      .fetchUserDataBySearchName(keyword)
      .subscribe((data: user[][]) => {
        this.userdata = data;
        this.index = 0;
        this.pagination_userdata = this.userdata[this.index];
        this.filtered_userdata = this.userdata[this.index];
        this.length = this.userService.length;
        this.paginationLength = this.userService.length / 20;
      });
  }
}
