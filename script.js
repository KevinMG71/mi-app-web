document.addEventListener("DOMContentLoaded", () => {

  // LOGIN
  window.login = function () {
    const user = document.getElementById("usuario")?.value.trim();
    const pass = document.getElementById("password")?.value.trim();

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("login", "true");
      window.location.href = "app.html";
    } else {
      const msg = document.getElementById("mensaje");
      if (msg) msg.innerText = "❌ Usuario o contraseña incorrectos";
    }
  };

  // LOGOUT
  window.logout = function () {
    localStorage.removeItem("login");
    window.location.href = "index.html";
  };

  // PROTECCIÓN
  if (window.location.pathname.includes("app.html")) {
    if (localStorage.getItem("login") !== "true") {
      window.location.href = "index.html";
      return;
    }
  }

  // AGREGAR TAREA
  window.agregarTarea = function () {
    const input = document.getElementById("tarea");
    const lista = document.getElementById("lista");

    if (!input || !lista) return;

    const texto = input.value.trim();
    if (texto === "") return;

    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push({ texto, completada: false });
    localStorage.setItem("tareas", JSON.stringify(tareas));

    crearTarea(texto, false);
    input.value = "";
  };

  function crearTarea(texto, completada) {
    const lista = document.getElementById("lista");
    if (!lista) return;

    const li = document.createElement("li");
    li.textContent = texto;

    if (completada) li.classList.add("completada");

    li.onclick = () => {
      li.classList.toggle("completada");
      actualizarEstado(texto);
    };

    lista.appendChild(li);
  }

  function actualizarEstado(texto) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.map(t =>
      t.texto === texto ? { ...t, completada: !t.completada } : t
    );
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  function cargarTareas() {
    const lista = document.getElementById("lista");
    if (!lista) return;

    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach(t => crearTarea(t.texto, t.completada));
  }

  cargarTareas();
});



