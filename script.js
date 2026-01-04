// =====================
// LOGIN
// =====================
function login() {
  const user = document.getElementById("usuario")?.value.trim();
  const pass = document.getElementById("password")?.value.trim();

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("login", "true");
    window.location.href = "app.html";
  } else {
    const msg = document.getElementById("mensaje");
    if (msg) msg.innerText = "❌ Usuario o contraseña incorrectos";
  }
}

// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// =====================
// PROTECCIÓN
// =====================
if (window.location.pathname.includes("app.html")) {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
  }
}

// =====================
// TAREAS
// =====================
function agregarTarea() {
  const input = document.getElementById("tarea");
  const lista = document.getElementById("lista");

  if (!input || !lista) return;

  const texto = input.value.trim();
  if (texto === "") return;

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push({ texto, completada: false });
  localStorage.setItem("tareas", JSON.stringify(tareas));

  const li = document.createElement("li");
  li.textContent = texto;

  li.onclick = () => {
    li.classList.toggle("completada");
  };

  lista.appendChild(li);
  input.value = "";
}

// =====================
// CARGAR TAREAS
// =====================
const lista = document.getElementById("lista");
if (lista) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.texto;
    if (t.completada) li.classList.add("completada");
    li.onclick = () => li.classList.toggle("completada");
    lista.appendChild(li);
  });
}




