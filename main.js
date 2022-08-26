const navbar = document.getElementById("navbar");
const URL ='https://api.openweathermap.org/data/2.5/weather?';

const API_KEY = "58fcdbab9c859a3592bcb84e1cc11eec";
const LATITUDE = -24.18;
const LONGITUDE = -65.33;

const params = new URLSearchParams({
  lat: LATITUDE,
  lon: LONGITUDE,
  appid: API_KEY,
  lang: "sp",
  units: "metric",
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "#FBF4E9";
    navbar.style.backgroundColor = "#6ECB63";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});

const list = document.querySelector('.cities');
fetch(URL+params)
  .then((response) => response.json())
  .then((data) => {
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;
    const temp = main.temp.toFixed(1);
    const div = document.createElement('div');

    console.log(data);
    //div.classList.add('city');
    div.classList.add('border');
    const markup = ` <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${temp}<sup>°C</sup></div>
    <figure>
    <img class="city-icon" src=${icon} alt="${weather[0]['description']}">
    <figcaption>${weather[0]['description']}</figcaption>
    </figure>`;
    div.innerHTML = markup;
    list.appendChild(div);
  });

document.getElementById('enviar');
