import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private user: UserService) {}
}
