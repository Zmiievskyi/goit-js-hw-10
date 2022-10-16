const options = {
  BASE_URL: 'https://restcountries.com/v2/name/',
  FILTER_URL: '?fields=name,flags,capital,population,languages',
};

export default class ApiService {
  constructor() {
    this.searchCountry = '';
  }

  fetchCountries() {
    return fetch(
      `${options.BASE_URL}${this.searchCountry.trim()}${options.FILTER_URL}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  get country() {
    return this.searchCountry;
  }

  set country(newCountry) {
    this.searchCountry = newCountry;
  }
}
