import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";

const input = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");

function searchForCountry(countryName) {
    const search = debounce(() => {
        fetchCountries(countryName)
        .then((countryList) => {
            console.log(countryList);
            if (countryList.length > 10) {
                Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
            } else if (countryList.length >= 2 && countryList.length <= 10) {
                const html = countryList.map((countries) => {
                    return `<div class="country">`+
                        `<p class="name">`+
                            `<img width="32" height="16" src="${countries.flags.svg}" alt="${countries.flags.alt}"></img>`+
                            `<span>${countries.name.common}</span>`+
                        `</p>`+
                    `</div>`;
                }).join("");
                countryInfo.innerHTML = html;
            } else {
                const html = countryList.map((countries) => {
                    const languages = Object.values(countries.languages).join(", ");
                    return `<div class="country">`+
                        `<p class="name">`+
                            `<img width="32" height="16" src="${countries.flags.svg}" alt="${countries.flags.alt}"></img>`+
                            `<span>${countries.name.common}</span>`+
                        `</p>`+
                        `<p class="capital">`+
                            `<b>Capital: </b>`+
                            `<span>${countries.capital}</span>`+
                        `</p>`+
                        `<p class="population">`+
                            `<b>Population: </b>`+
                            `<span>${countries.population}</span>`+
                        `</p>`+
                        `<p class="languages">`+
                            `<b>Languages: </b>`+
                            `<span>${languages}</span>`+
                        `</p>`+
                    `</div>`;
                }).join("");
                countryInfo.innerHTML = html;
            }
        })
        .catch((error) => {
            Notiflix.Notify.failure(error.message("Oops, there is no country with that name"));
        })
    }, 300);

    search();
}

input.addEventListener("input", (event) => {
    const country = event.target.value;
    searchForCountry(country);
});
