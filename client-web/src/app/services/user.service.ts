import { Observable, map } from 'rxjs';
import { user } from '../model/user.model';
import { MyHttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userdata: user[] = [];
  domains: any[] = [];
  gender: any[] = [];
  available: any[] = [];
  length: any = 0;

  constructor(private http: MyHttpService) {}

  fetchUserData(): Observable<any[][]> {
    return this.http.getData('./../assets/heliverse_mock_data.json').pipe(
      map((data) => {
        this.userdata = data;
        this.length = data.length;
        this.domains = [...new Set(data.map((item: any) => item.domain))];
        this.gender = [...new Set(data.map((item: any) => item.gender))];
        this.available = [...new Set(data.map((item: any) => item.available))];
        return this.splitUserData(20);
      })
    );
  }

  fetchUserDataBySearchName(keyword: string): Observable<any[][]> {
    return this.http.getData('./../assets/heliverse_mock_data.json').pipe(
      map((data) => {
        return data.filter((person: any) =>
          person.first_name.toLowerCase().includes(keyword.toLowerCase())
        );
      }),
      map((data) => {
        this.userdata = data;
        this.length = data.length;
        return this.splitUserData(20);
      })
    );
  }

  private splitUserData = (chunkSize: number): user[][] => {
    const chunks: user[][] = [];
    const numberOfChunks = Math.ceil(this.userdata.length / chunkSize);
    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      chunks.push(this.userdata.slice(start, end));
    }
    return chunks;
  };
}
