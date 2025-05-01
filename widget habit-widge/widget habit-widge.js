let habits = [
  { id: 1, name: "Drink Water", days: new Array(7).fill(false), points: 5 },
  { id: 2, name: "Exercise", days: new Array(7).fill(false), points: 10 },
];

let userStats = {
  points: 0,
  level: 1,
  streak: 0,
};

function renderHabits() {
  const container = document.getElementById("habit-container");
  container.innerHTML = habits
    .map(
      (habit) => `
      <div class="habit-card" data-id="${habit.id}">
        <span>${habit.name} (${habit.points}pts/day)</span>
        <div class="habit-days">
          ${habit.days
            .map(
              (completed, index) => `
            <input 
              type="checkbox" 
              class="day-checkbox" 
              ${completed ? "checked" : ""}
              onchange="updateHabit(${habit.id}, ${index})"
            >
          `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");

  updateRewardStatus();
}

function updateHabit(habitId, dayIndex) {
  const habit = habits.find((h) => h.id === habitId);
  habit.days[dayIndex] = !habit.days[dayIndex];

  calculatePoints();
  saveToLocalStorage();
}

function calculatePoints() {
  userStats.points = habits.reduce((total, habit) => {
    return total + habit.days.filter(Boolean).length * habit.points;
  }, 0);

  userStats.level = Math.floor(userStats.points / 100) + 1;
}

function updateRewardStatus() {
  document.getElementById("points").textContent = userStats.points;
  document.getElementById("level").textContent = userStats.level;

  if (userStats.points > 0) {
    document.querySelector(
      ".habit-widget"
    ).style.background = `linear-gradient(135deg, #${Math.min(
      600 - userStats.level * 50,
      255
    )
      .toString(16)
      .padStart(2, "0")}8efb, #a777e3)`;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("userStats", JSON.stringify(userStats));
}

function loadFromLocalStorage() {
  const savedHabits = localStorage.getItem("habits");
  const savedStats = localStorage.getItem("userStats");
  if (savedHabits) habits = JSON.parse(savedHabits);
  if (savedStats) userStats = JSON.parse(savedStats);
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderHabits();
});

function checkStreak() {
  const today = new Date().getDay(); // 0-6 (Sun-Sat)
  if (habits.some((habit) => habit.days[today])) {
    userStats.streak++;
  } else {
    userStats.streak = 0;
  }
}
