import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { user } from '../../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  userdata: user[] = [];
  length: number = 0;
  index: number = 0;
  paginationLength: number = 0;
  paginationUserdata: user[] = [];
  itemsPerPage: number = 20;
  filteredUserData: user[] = [];
  domains: string[] = [];
  genders: string[] = [];
  teamCount: Number = 0;
  searchKeyword: string = '';
  availabilityFilter: any = '';
  selectedDomain: string = '';
  selectedGender: string = '';
  showError: boolean = false;
  error: string = '';
  constructor(private title: Title, private userService: UserService) {
    this.setDynamicTitle();
  }

  ngOnInit(): void {
    this.teamCount = this.userService.teamData.length;
    this.userService.fetchUserData().subscribe((data: user[]) => {
      this.domains = this.userService.domains;
      this.genders = this.userService.genders;
      this.userdata = data;
      this.filter();
    });
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }

  setDynamicTitle() {
    this.setTitle('Home');
  }

  next() {
    if (
      this.index * this.itemsPerPage + this.itemsPerPage <
      this.filteredUserData.length - 1
    ) {
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

  filter() {
    console.log(this.availabilityFilter);
    this.index = 0;
    this.filteredUserData = this.userdata.filter((person: any) => {
      return (
        (!this.searchKeyword ||
          person.first_name.includes(this.searchKeyword)) &&
        (!this.selectedDomain || person.domain == this.selectedDomain) &&
        (!this.selectedGender || person.gender == this.selectedGender) &&
        (!this.availabilityFilter ||
          person.available == this.availabilityFilter)
      );
    });
    this.updateFilteredData(this.filteredUserData);
  }

  private updateFilteredData(filteredData: user[]) {
    this.paginationUserdata = filteredData.slice(
      this.index,
      this.index + this.itemsPerPage
    );
    this.length = filteredData.length;
    this.paginationLength = this.paginationUserdata.length;
  }

  updatePaginationData() {
    const startIndex = this.index * this.itemsPerPage;
    this.paginationUserdata = this.userdata.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
    this.paginationLength = this.paginationUserdata.length;
  }

  setTeamCount(data: Number) {
    this.teamCount = data;
  }
  setError(data: string) {
    this.error = data;
    this.showError = true;
  }
  closeError() {
    this.showError = false;
  }
}
