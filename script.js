document.addEventListener("DOMContentLoaded", () => {

  // LOGIN
  window.login = function () {
    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("login", "true");
      window.location.href = "app.html";
    } else {
      document.getElementById("mensaje").innerText =
        "❌ Usuario o contraseña incorrectos";
    }
  };

  // PROTECCIÓN DE app.html
  if (window.location.pathname.includes("app.html")) {
    if (localStorage.getItem("login") !== "true") {
      window.location.href = "index.html";
    }
  }

  // TAREAS
  const lista = document.getElementById("lista");

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(t => crearTarea(t.texto, t.completada));
}

function agregarTarea() {
  const input = document.getElementById("tarea");
  const texto = input.value.trim();
  if (texto === "") return;

  crearTarea(texto, false);

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push({ texto: texto, completada: false });
  localStorage.setItem("tareas", JSON.stringify(tareas));

  input.value = "";
}

function crearTarea(texto, completada) {
  const li = document.createElement("li");
  li.textContent = texto;
  li.classList.add("tarea");

  if (completada) {
    li.classList.add("completada");
  }

  li.addEventListener("click", () => {
    li.classList.toggle("completada");
    actualizarEstadoTarea(texto);
  });

  lista.appendChild(li);
}

function actualizarEstadoTarea(texto) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = tareas.map(t =>
    t.texto === texto
      ? { texto: t.texto, completada: !t.completada }
      : t
  );
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

if (lista) {
  cargarTareas();
}
});
