const weather = document.querySelector(".js-weather");

const API_KEY = "ca7d7a8a54939191522b490df6f40969";
const GEO = "geo";

function getGeo(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = json.main.temp;
      const place = json.name;
      const main = json.weather[0].main;
      const description = json.weather[0].description;
      // const icon = json.weather[0].icon;

      paintImage(main);

      weather.innerText = `${temperature}, ${description} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(GEO, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getGeo(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForGeo() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadGeo() {
  const loadedGeo = localStorage.getItem(GEO);
  if (loadedGeo === null) {
    askForGeo();
  } else {
    const parseGeo = JSON.parse(loadedGeo);
    getGeo(parseGeo.latitude, parseGeo.longitude);
  }
}

function init() {
  loadGeo();
}

init();
