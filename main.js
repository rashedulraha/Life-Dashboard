// ===== ১. Clock & Date =====
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}
setInterval(updateClock, 1000);

// ===== ২. To-Do List with LocalStorage =====
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    if (task.completed) li.classList.add("completed");
    li.addEventListener("click", () => toggleTask(index));
    taskList.appendChild(li);
  });
}

function addTask() {
  if (taskInput.value.trim() === "") return;
  tasks.push({ text: taskInput.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

// ===== ৩. Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// ===== ৪. Weather API (OpenWeatherMap) =====
async function fetchWeather() {
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  const city = "Dhaka";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    document.getElementById("weather-info").innerHTML = `
      <p>${data.name}: ${data.main.temp}°C</p>
      <p>${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}
fetchWeather();

// ===== ৫. Random Quote API =====
async function fetchQuote() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const quotes = await response.json();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").textContent = `"${randomQuote.text}"`;
    document.getElementById("quote-author").textContent = `— ${
      randomQuote.author || "Unknown"
    }`;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}
fetchQuote();

function showNotification(title, message) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body: message });
      }
    });
  }
}

// টেস্ট নোটিফিকেশন (প্রতি 10 সেকেন্ডে)
setInterval(() => {
  showNotification("Reminder", "Stay hydrated! Drink water 💧");
}, 10000);
