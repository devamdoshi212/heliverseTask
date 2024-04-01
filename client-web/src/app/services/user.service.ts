import { user } from '../model/user.model';

export class UserService {
  userdata: user[] = [];
  length: any = 0;
  chunks: user[][] = [];

  constructor() {}

  fetchUserData = (): Promise<user[][]> => {
    return fetch('./../assets/heliverse_mock_data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: user[]) => {
        console.log(data);
        this.userdata = data;
        this.length = data.length;
        return this.splitUserData(20);
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
        return [];
      });
  };

  splitUserData = (chunkSize: number): user[][] => {
    const numberOfChunks = Math.ceil(this.userdata.length / chunkSize);
    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      this.chunks.push(this.userdata.slice(start, end));
    }
    console.log(this.chunks);
    return this.chunks;
  };
}
