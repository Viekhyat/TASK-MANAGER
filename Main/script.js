// Retrieve user data from local storage
const userData = JSON.parse(localStorage.getItem('userData'));

// Populate the user's name and age on the page (assuming elements exist)
if (document.getElementById('user-name')) {
  document.getElementById('user-name').textContent = userData.name;
}
if (document.getElementById('user-age')) {
  document.getElementById('user-age').textContent = userData.age;
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const reminderDateTime = document.getElementById("reminder-datetime");

function formatDateTime(dateTime) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return new Date(dateTime).toLocaleString('en-US', options);
}

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else if (reminderDateTime.value === '') {
    alert("You must set a reminder date and time!");
  } else {
    let li = document.createElement("li");

    // Create a div to hold the task text and date-time
    let taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    taskContent.innerHTML = inputBox.value;

    // Add date and time
    let dateTime = formatDateTime(reminderDateTime.value);
    let dateTimeSpan = document.createElement("span");
    dateTimeSpan.classList.add("date-time");
    dateTimeSpan.textContent = ` (${dateTime})`;
    taskContent.appendChild(dateTimeSpan);

    li.appendChild(taskContent);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("delete-task");  // Add class for styling
    li.appendChild(span);

    listContainer.appendChild(li);

    // Set an alert for the task
    const reminderTime = new Date(reminderDateTime.value).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        alert(`Reminder: ${inputBox.value}`);
      }, timeDifference);
    } else {
      alert("Reminder time must be in the future!");
    }

    // Add event listener for checking/unchecking tasks
    li.addEventListener("click", function() {
      li.classList.toggle("checked");
      saveData();
    });

    // Add event listener for deleting tasks
    span.addEventListener("click", function() {
      li.remove();
      saveData();
    });
  }
  inputBox.value = "";
  reminderDateTime.value = "";
  saveData();
}

function saveData() {
  const tasks = [];
  for (const item of listContainer.children) {
    const text = item.querySelector(".task-content").childNodes[0].textContent;
    const dateTime = item.querySelector(".date-time").textContent;
    tasks.push({ text, dateTime, completed: item.classList.contains("checked") });
  }
  localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
  const storedTasks = JSON.parse(localStorage.getItem("data"));
  if (storedTasks) {
    listContainer.innerHTML = ""; // Clear existing content
    for (const task of storedTasks) {
      const li = document.createElement("li");
      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");
      taskContent.textContent = task.text;
      if (task.completed) {
        li.classList.add("checked");
      }

      const dateTimeSpan = document.createElement("span");
      dateTimeSpan.classList.add("date-time");
      dateTimeSpan.textContent = task.dateTime;
      taskContent.appendChild(dateTimeSpan);

      li.appendChild(taskContent);

      const span = document.createElement("span");
      span.innerHTML = "\u00d7";
      span.classList.add("delete-task");  // Add class for styling
      li.appendChild(span);

      // Add event listener for checking/unchecking tasks
      li.addEventListener("click", function() {
        li.classList.toggle("checked");
        saveData();
      });

      // Add event listener for deleting tasks
      span.addEventListener("click", function() {
        li.remove();
        saveData();
      });

      listContainer.appendChild(li);
    }
  }
}

showTask();