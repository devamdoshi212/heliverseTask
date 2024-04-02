import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MyHttpService } from './services/http.service';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, CardComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [UserService, MyHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
