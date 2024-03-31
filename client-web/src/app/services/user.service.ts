export class UserService {
  constructor() {
    fetch('./../assets/heliverse_mock_data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem fetching the data:', error);
      });
  }
}
