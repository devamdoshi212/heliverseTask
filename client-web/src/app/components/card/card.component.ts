import { Component, Input } from '@angular/core';
import { user } from '../../model/user.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  userdata!: user;

  constructor() {}
}
