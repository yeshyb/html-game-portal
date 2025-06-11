function login() {
  const username = document.getElementById("username").value;
  if (!username) return alert("Enter a username");
  localStorage.setItem("currentUser", username);
  if (!localStorage.getItem("users")) localStorage.setItem("users", JSON.stringify({}));
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users[username]) users[username] = { flappy: 0, clicker: 0, match3: 0, platformer: 0 };
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("login-container").style.display = "none";
  document.getElementById("main-container").style.display = "block";
  loadUser();
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

function loadUser() {
  const user = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  document.getElementById("welcome").innerText = "Welcome, " + user;
  const scoreList = document.getElementById("score-list");
  scoreList.innerHTML = "";
  for (let game in users[user]) {
    const li = document.createElement("li");
    li.textContent = game + ": " + users[user][game];
    scoreList.appendChild(li);
  }
}

function showGame(game) {
  document.getElementById("game-frame").src = "games/" + game + ".html";
}

window.onload = function () {
  if (localStorage.getItem("currentUser")) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-container").style.display = "block";
    loadUser();
  }
};
