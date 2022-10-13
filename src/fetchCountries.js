const BASE_URL = 'https://restcountries.com/v2/name/';
const FILTER_URL = '?fields=name,flags,capital,population,languages';

const fetchCountries = function (name) {
  return fetch(`${BASE_URL}${name.trim()}${FILTER_URL}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export { fetchCountries };
