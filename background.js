const body = document.querySelector("body");

// const WEATHER_CONDITION = [
//   "Thunderstorm",
//   "Drizzle",
//   "Rain",
//   "Snow",
//   "Atmosphere",
//   "Clear",
//   "Clouds",
// ];

const IMG_NUMBER = 4;

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function getImage(name, randomNumber) {
  const image = new Image();
  image.src = `images/${name}${randomNumber + 1}.jpg`;
  image.classList.add("bgImage");
  //   body.appendChild(image);
  body.prepend(image);
  //   image.addEventListener("load", handleImgLoad);
}

function paintImage(weather) {
  const randomNumber = genRandom();
  const name = weather.toLowerCase();
  getImage(name, randomNumber);
}
