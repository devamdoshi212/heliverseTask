import { user } from '../model/user.model';

export class UserService {
  userdata: user[] = [];
  chunks: user[] = [];

  constructor() {}

  fetchUserData = () => {
    fetch('./../assets/heliverse_mock_data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.userdata = data;
        this.splitUserData(2);
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
      });
  };

  splitUserData = (number: any) => {
    const end: any = number * 20;
    const start: any = end - 20;
    this.chunks = this.userdata.slice(start, end);
    console.log(this.chunks);
  };
}
