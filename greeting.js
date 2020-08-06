const form = document.querySelector(".js-nameForm"),
  input = form.querySelector(".js-nameInput"),
  button = document.querySelector(".js-remove"),
  greeting = document.querySelector(".js-greeting");

const USER_NAME = "userName";
const SHOWING_CLASS = "showing";
const START = ["afternoon", "evening", "night", "morning"];

function saveUserName(userName) {
  localStorage.setItem(USER_NAME, userName);
}

function handleSubmit(event) {
  event.preventDefault();
  const userName = input.value;
  input.value = "";
  saveUserName(userName);
  paintGreeting(userName);
}

function askUserName() {
  form.classList.add(SHOWING_CLASS);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(userName) {
  form.classList.remove(SHOWING_CLASS);
  button.classList.add(SHOWING_CLASS);
  greeting.classList.add(SHOWING_CLASS);
  // const date = new Date();
  // const hours = date.getHours();

  // let start = "";
  // if (hours >= 12 && hours < 17) {
  //   start = START[0];
  // } else if (hours >= 17 && hours < 20) {
  //   start = START[1];
  // } else if (hours >= 20 || hours < 6) {
  //   start = START[2];
  // } else {
  //   start = START[3];
  // }

  // greeting.innerText = `good ${start}, ${userName}`;
  greeting.innerText = `Hello, ${userName}!`;
}

function handleRemove() {
  const userName = localStorage.getItem(USER_NAME);
  localStorage.removeItem(USER_NAME);

  form.classList.add(SHOWING_CLASS);
  button.classList.remove(SHOWING_CLASS);
  greeting.classList.remove(SHOWING_CLASS);
}

function init() {
  const userName = localStorage.getItem(USER_NAME);
  if (userName === null) {
    askUserName();
  } else {
    paintGreeting(userName);
  }
  button.addEventListener("click", handleRemove);
}

init();
