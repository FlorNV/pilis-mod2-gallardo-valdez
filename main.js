// Mostrar los datos del tiempo
const URL_API = "https://api.openweathermap.org/data/2.5/weather?";
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

const list = document.querySelector(".cities");
fetch(URL_API + params)
  .then((response) => response.json())
  .then((data) => {
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
    const temp = main.temp.toFixed(1);
    const div = document.createElement("div");

    console.log(data);
    div.classList.add("border");
    const markup = `
    <h2 class="city-name" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${temp}°C</div>
    <figure>
      <img class="city-icon" src=${icon} alt="${weather[0]["description"]}">
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>`;
    div.innerHTML = markup;
    list.appendChild(div);
  });

document.getElementById("enviar");

// Envío y validación del formulario
const business = document.getElementById("business");
const owner = document.getElementById("owner");
const phone = document.getElementById("phone");

const sendData = (e) => {
  e.preventDefault();

  if (validateForm()) {
    const data = {
      business: business.value,
      owner: owner.value,
      phone: phone.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        Swal.fire({
          title: "Datos enviados",
          text: "En breve nos pondremos en contacto",
          icon: "success",
          confirmButtonColor: "#EC9CD3",
        });
        cleanForm();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Algo salió mal",
          icon: "error",
          confirmButtonColor: "#EC9CD3",
        });
      });
  } else {
    Swal.fire({
      title: "Advertencia",
      text: "Revisa tus datos",
      icon: "warning",
      confirmButtonColor: "#EC9CD3",
    });
  }
};

function cleanForm() {
  const form = document.getElementById("form");
  form.reset();
}

const validateForm = () => {
  let businessOk = validateBusiness();
  let ownerOk = validateOwner();
  let phoneOk = validatePhone();
  return businessOk && ownerOk && phoneOk;
};

const validateBusiness = () => {
  const businessError = document.getElementById("business-error");
  if (business.value === "") {
    businessError.classList.remove("opacity-0");
    businessError.classList.add("opacity-1");
    business.classList.add("invalid");
    return false;
  } else {
    businessError.classList.remove("opacity-1");
    businessError.classList.add("opacity-0");
    business.classList.remove("invalid");
    return true;
  }
};

const validateOwner = () => {
  const ownerError = document.getElementById("owner-error");
  if (owner.value === "") {
    ownerError.classList.remove("opacity-0");
    ownerError.classList.add("opacity-1");
    owner.classList.add("invalid");
    return false;
  } else {
    ownerError.classList.remove("opacity-1");
    ownerError.classList.add("opacity-0");
    owner.classList.remove("invalid");
    return true;
  }
};

const validatePhone = () => {
  const phoneError = document.getElementById("phone-error");
  if (phone.value === "") {
    phoneError.classList.remove("opacity-0");
    phoneError.classList.add("opacity-1");
    phone.classList.add("invalid");
    return false;
  } else {
    phoneError.classList.remove("opacity-1");
    phoneError.classList.add("opacity-0");
    phone.classList.remove("invalid");
    return true;
  }
};

document.getElementById("send").addEventListener("click", sendData);
business.addEventListener("input", validateBusiness);
owner.addEventListener("input", validateOwner);
phone.addEventListener("input", validatePhone);

// Efecto con scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "#FBF4E9";
    navbar.style.backgroundColor = "#6ECB63";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});
