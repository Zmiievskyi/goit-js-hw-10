import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import _ from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

//________________________________________________________________refs

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

countryListRef.style.listStyle = 'none';
countryInfoRef.style.listStyle = 'none';

//________________________________________________________________add-listeners

inputRef.addEventListener('input', _(onSearch, DEBOUNCE_DELAY));

//________________________________________________________________country-Search

function onSearch(e) {
  e.preventDefault();
  const input = e.target.value;
  if (input.length < 1) {
    return (countryListRef.innerHTML = '');
  }
  fetchCountries(input)
    .then(response => {
      console.log(response);
      markup(response);
    })
    .catch(error => {
      console.log(error);
      return Notify.failure(`Oops, there is no country with that name`);
    });
}

//________________________________________________________________markup

function markup(response) {
  if (response.length > 10) {
    return answerIfWrongInput();
  }
  if (response.length >= 2 && response.length <= 10) {
    countryInfoRef.innerHTML = '';
    return markupForArr(response);
  }
  countryListRef.innerHTML = '';
  return markupForOne(response);
}

function answerIfWrongInput() {
  return Notify.info(
    `Too many matches found. Please enter a more specific name.`
  );
}

//________________________________________________________________make-Markups

function markupForOne(response) {
  const markupInfo = response
    .map(({ name, flags, capital, population, languages }) => {
      const lang = languages.map(({ name }) => ` ${name}`);
      return `<li style="display: flex;">
        <img style="margin-right: 10px;" src=${flags.svg} alt="Кот" width="20">
        ${name}
        </li>
        <li>capital: ${capital}</li>
        <li>population: ${population}</li>
        <li>languages: ${lang}</li>`;
    })
    .join('');

  countryInfoRef.innerHTML = markupInfo;
}

function markupForArr(response) {
  const markupItem = response
    .map(
      ({ name, flags }) =>
        `<li style="display: flex; font-size: 16px;"> 
            <img style="margin-right: 10px" src=${flags.svg} alt="Кот" width="20">
            ${name}
        </li>`
    )
    .join('');

  countryListRef.innerHTML = markupItem;
}





