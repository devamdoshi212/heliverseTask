import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private title: Title) {
    this.setDynamicTitle();
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  setDynamicTitle() {
    this.setTitle('Task');
  }
}
