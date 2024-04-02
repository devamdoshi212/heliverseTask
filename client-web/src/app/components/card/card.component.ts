import { Component, Input, OnInit } from '@angular/core';
import { user } from '../../model/user.model';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { faFemale } from '@fortawesome/free-solid-svg-icons';
import { faTransgender } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input()
  userdata!: user;
  male = faMale;
  female = faFemale;
  bigender = faTransgender;
  iconSize: number = 32;
  iconColor: string = 'white';
  ngOnInit(): void {}
  constructor() {}
  setIcon(gender: any) {
    if (gender === 'Male') {
      return this.male;
    } else if (gender === 'Female') {
      return this.female;
    } else {
      return this.bigender;
    }
  }
}
