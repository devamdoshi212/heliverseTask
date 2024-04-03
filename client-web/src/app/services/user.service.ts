import { Observable, map, of } from 'rxjs';
import { user } from '../model/user.model';
import { MyHttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userdata: user[] = [];
  domains: string[] = [];
  genders: string[] = [];
  available: string[] = [];
  length: Number = 0;

  teamData: user[] = [];
  constructor(private http: MyHttpService) {}

  fetchUserData(): Observable<user[]> {
    return this.http.getData('./../assets/heliverse_mock_data.json').pipe(
      map((data) => {
        this.userdata = data;
        this.length = data.length;
        this.domains = [
          ...new Set(data.map((item: user) => item.domain)),
        ] as string[];
        this.genders = [
          ...new Set(data.map((item: user) => item.gender)),
        ] as string[];
        this.available = [
          ...new Set(data.map((item: user) => item.available)),
        ] as string[];
        return data;
      })
    );
  }

  addTeamMember(member: user) {
    this.teamData.push(member);
    console.log(this.teamData);
  }
  removeTeamMember(member: user) {}
}
