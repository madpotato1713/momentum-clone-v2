const clockContainer = document.querySelector(".js-clock"),
  clockText = clockContainer.querySelector("h1");

function setime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const convertedHourse = hours % 12 === 0 ? 12 : hours % 12;

  clockText.innerText = `${
    convertedHourse < 10 ? `0${convertedHourse}` : convertedHourse
  }:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  } ${hours < 12 ? "AM" : "PM"}`;
}

function init() {
  setime();
  setInterval(setime, 1000);
}

init();
