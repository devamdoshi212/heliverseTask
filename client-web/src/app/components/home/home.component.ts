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
  length: number = 0;
  index: number = 0;
  paginationLength: number = 0;
  paginationUserdata: user[] = [];
  filteredUserdata: user[] = [];
  searchKeyword: string = '';

  constructor(private title: Title, private userService: UserService) {
    this.setDynamicTitle();
  }

  ngOnInit(): void {
    this.userService.fetchUserData().subscribe((data: user[][]) => {
      this.userdata = data;
      this.updatePaginationData();
    });
  }

  setPaginatedData(index: number) {
    if (index >= 0 && index < this.userdata.length) {
      this.index = index;
      this.updatePaginationData();
    }
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setDynamicTitle() {
    this.setTitle('Home');
  }

  next() {
    if (this.index < this.userdata.length - 1) {
      this.index++;
      this.updatePaginationData();
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--;
      this.updatePaginationData();
    }
  }

  searchByName(keyword: string) {
    this.userService
      .fetchUserDataBySearchName(keyword)
      .subscribe((data: user[][]) => {
        this.userdata = data;
        this.index = 0;
        this.updatePaginationData();
      });
  }

  private updatePaginationData() {
    this.filteredUserdata = this.userdata[this.index];
    this.paginationUserdata = this.userdata[this.index];
    this.length = this.userService.length;
    this.paginationLength = this.userService.length / 20;
  }
}
