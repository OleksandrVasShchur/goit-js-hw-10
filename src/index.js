import './css/styles.css'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;



const inputValueRef = document.getElementById("search-box");
const listDescriptionRef = document.querySelector(".country-list");
const descriptionCountryRef = document.querySelector(".country-info");

inputValueRef.addEventListener("input", debounce(onInputValue, DEBOUNCE_DELAY));


function onInputValue(event) {
    // console.log("works");

    const inputUserText = event.target.value.trim();
    console.log(inputUserText); 
    if(inputUserText === "" ) {
        console.log("o my God");
        
    }

fetchCountries(inputUserText) 
    .then(countries => {

    console.log(countries)

    listDescriptionRef.innerHTML = ""
    descriptionCountryRef.innerHTML = ""

    if(countries.length === 1) {
        listDescriptionRef.insertAdjacentHTML("beforeend", renderFlagAndName(countries))
        descriptionCountryRef.insertAdjacentHTML("beforeend", renderDescriptionOfCountry(countries))
    } else if(countries.length >= 10){
        messageToMutchCountryes();
    } else {
        listDescriptionRef.insertAdjacentHTML("beforeend", renderFlagAndName(countries))
    }
    })
    .catch(messageWrongError)
}


function renderFlagAndName(countries) {
    const markHeader = countries.map(({flags, name})=> {
        return ` <li class="country-list-element">
        <img class="country-list-flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
        <p class="country-list-name">${name.official}</p>
        </li>`
    }).join("")
   console.log(markHeader)
    return markHeader; 
}


function renderDescriptionOfCountry(countries) {
    const markBody = countries.map(({capital, languages, population})=> {
        return `<ul class="country-info-list">
        <li class=f"country-info-element"><span>Capital: </span>${capital} </li>
        <li class=f"country-info-element"><span>Population: </span> ${population}</li>
        <li class=f"country-info-element"><span>Languages: </span>${Object.values(languages).join(", ")}</li>
        </ul>`
    }).join("")
    return markBody;

}


function messageToMutchCountryes(){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function messageWrongError() {
    Notiflix.Notify.failure("Oops, there is no country with that name.");
}
