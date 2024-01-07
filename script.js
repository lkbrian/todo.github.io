const form = document.querySelector("form");
let userInput = document.querySelector("#todotask");
let taskData = document.querySelector(".todo-content");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createTodo(event);
  form.reset();
});

function createTodo(event) {
  let task = event.target.todotask.value;
  let description = event.target.description.value;
  let date = new Date();
  const wraptask = document.createElement("div");
  wraptask.className = "wraptask";
  wraptask.innerHTML = `
  <i class="fa-solid fa-trash-can btn"></i>
  <div class="taskitems">
    <h3 id="tasktitle">${task}</h3>
    <p id="taskdesc">${description}</p>
    </div>
    <div id="actions">
    <p id="date">${date.toDateString()}</p>
    <p id="time">${date.toLocaleTimeString()}</p>  
    </div>    
    `;
  let taskcard = document.querySelector(".todo-content");
  taskcard.appendChild(wraptask);

  saveData();

  let deleteButtons = document.querySelectorAll(".btn");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", handleDelet);
  });
}

function handleDelet(event) {
  event.target.parentNode.remove();
  saveData();
}
function clock() {
  let time = new Date();
  let options = { weekday: "long" };
  let day = time.toLocaleDateString("en-US", options);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  document.getElementById("clock").innerHTML =
    hours + ":" + minutes + ":" + seconds;
  setTimeout(clock, 1000);
  document.querySelector("#day").textContent = day;
}
clock();
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

function saveData() {
  localStorage.setItem("todos", taskData.innerHTML);
  console.log("saved data");
}

function showTasks() {
  taskData.innerHTML = localStorage.getItem("todos");
  console.log("got the data");
}
showTasks();

taskData.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    handleDelet(event);
  }
});