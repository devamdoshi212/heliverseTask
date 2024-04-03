import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { user } from '../../model/user.model';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { faFemale } from '@fortawesome/free-solid-svg-icons';
import { faTransgender } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements AfterViewInit {
  @Input()
  userdata!: user;

  @Output() count = new EventEmitter<Number>();
  @Output() error = new EventEmitter<string>();
  @Output() filteredData = new EventEmitter<user[]>();

  male = faMale;
  female = faFemale;
  bigender = faTransgender;
  iconSize: number = 32;
  iconColor: string = 'white';

  @Input()
  valid: boolean = true;

  @Input()
  flag: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.valid) this.checkTeamMember();
    }, 1);
  }
  constructor(private userService: UserService) {}
  setIcon(gender: any) {
    if (gender === 'Male') {
      return this.male;
    } else if (gender === 'Female') {
      return this.female;
    } else {
      return this.bigender;
    }
  }
  addToTeam(data: user) {
    let domain = data.domain;
    let isUniqueDomain = !this.userService.teamData.some(
      (member) => member.domain === domain
    );

    if (isUniqueDomain) {
      this.userService.addTeamMember(data);
      this.valid = false;
      this.count.emit(this.userService.teamData.length);
    } else {
      this.error.emit('User with the same domain already exists in the team.');
    }
  }

  removeToTeam(data: user) {
    let filteredData = this.userService.teamData.filter(
      (person: user) => person !== data
    );
    this.filteredData.emit(filteredData);
  }

  checkTeamMember() {
    this.valid =
      this.userService.teamData.filter(
        (person) => person.id == this.userdata.id
      ).length == 0;
  }
}
