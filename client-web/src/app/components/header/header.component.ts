import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  flag: boolean = false;

  toggle() {
    this.flag = !this.flag;
  }
}
