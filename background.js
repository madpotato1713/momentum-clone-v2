const body = document.querySelector("body");

const IMG_NUMBER = 4;

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function getImage(name, randomNumber) {
  const image = new Image();
  image.src = `images/${name}${randomNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function paintImage(weather) {
  const randomNumber = genRandom();
  const name = weather.toLowerCase();
  getImage(name, randomNumber);
}
