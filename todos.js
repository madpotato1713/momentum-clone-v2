const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-todoInput"),
  todoList = document.querySelector(".js-todoList"),
  doneList = document.querySelector(".js-doneList");
// todoHeader = document.querySelector(".js-todoHeader"),
// doneHeader = document.querySelector(".js-doneHeader");

const TODO_LIST = "todoList";
const DONE_LIST = "doneList";
const JS_TODO_LIST = "js-todoList";
const JS_DONE_LIST = "js-doneList";

let toDos = [];
let dones = [];

function saveToDos() {
  localStorage.setItem(TODO_LIST, JSON.stringify(toDos));
}

function saveDones() {
  localStorage.setItem(DONE_LIST, JSON.stringify(dones));
}

function handleDelete(event) {
  const btn = event.target;
  const ulName = btn.parentNode.parentNode;
  const li = btn.parentNode;

  if (ulName.className.search(JS_TODO_LIST) !== -1) {
    todoList.removeChild(li);
    const renewedToDos = toDos.filter((toDo) => {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDos = renewedToDos;
    saveToDos();
  } else if (ulName.className.search(JS_DONE_LIST) !== -1) {
    doneList.removeChild(li);
    const renewedDones = dones.filter((done) => {
      return done.id !== parseInt(li.id, 10);
    });
    dones = renewedDones;
    saveDones();
  }

  // if (toDos.length <= 0) {
  //   todoHeader.classList.remove(SHOWING_CLASS);
  // }
  // if (dones.length <= 0) {
  //   doneHeader.classList.remove(SHOWING_CLASS);
  // }
}

function handleCheck(event) {
  const checkbox = event.target;
  const ulName = checkbox.parentNode.parentNode;
  const value = checkbox.parentNode.querySelector("span").innerText;
  handleDelete(event);

  if (ulName.className.search(JS_TODO_LIST) !== -1) {
    paintDoneList(value);
    // if (toDos.length <= 0) {
    //   todoHeader.classList.remove(SHOWING_CLASS);
    // }
    // doneHeader.classList.add(SHOWING_CLASS);
  } else if (ulName.className.search(JS_DONE_LIST) !== -1) {
    paintToDoList(value);
    // if (toDos.length <= 0) {
    //   doneHeader.classList.remove(SHOWING_CLASS);
    // }
    // todoHeader.classList.add(SHOWING_CLASS);
  }
}

function paintToDoList(value) {
  const li = document.createElement("li");
  li.classList.add("li");
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", handleCheck);
  const text = document.createElement("span");
  text.innerText = value;
  const delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDelete);
  const newId = toDos.length + 1;

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(delBtn);
  li.id = newId;

  todoList.appendChild(li);

  const toDoObj = {
    id: newId,
    value: value,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintDoneList(value) {
  const li = document.createElement("li");
  li.classList.add("li");
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = true;
  checkbox.addEventListener("change", handleCheck);
  const text = document.createElement("span");
  text.innerText = value;
  const delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDelete);
  const newId = dones.length + 1;

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(delBtn);
  li.id = newId;

  doneList.appendChild(li);

  const doneObj = {
    id: newId,
    value: value,
  };
  dones.push(doneObj);
  saveDones();
}

function handleSubmit(event) {
  event.preventDefault();
  // todoHeader.classList.add(SHOWING_CLASS);
  paintToDoList(toDoInput.value);
  toDoInput.value = "";
}

function load() {
  const toDosStr = localStorage.getItem(TODO_LIST);
  const toDoList = JSON.parse(toDosStr);
  if (toDosStr !== null) {
    // if (toDoList.length > 0) {
    //   todoHeader.classList.add(SHOWING_CLASS);
    // }
    toDoList.forEach((toDo) => {
      paintToDoList(toDo.value);
    });
  }

  const doneStr = localStorage.getItem(DONE_LIST);
  const doneList = JSON.parse(doneStr);
  if (doneStr !== null) {
    // if (doneList.length > 0) {
    //   doneHeader.classList.add(SHOWING_CLASS);
    // }
    doneList.forEach((done) => {
      paintDoneList(done.value);
    });
  }
}

function init() {
  load();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
