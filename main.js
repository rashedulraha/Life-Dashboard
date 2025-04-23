// Clock Function
function updateClock() {
  const now = new Date();
  const clockElement = document.getElementById("clock");
  clockElement.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// To-Do List (Basic)
document.getElementById("add-btn").addEventListener("click", () => {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    document.getElementById("todo-list").appendChild(li);
    input.value = "";
  }
});
