// Función para botón de salida
function confirmarSalida() {
  if (confirm("¿Estás seguro de que deseas salir?")) {
    window.location.href = "../index.html";
  }
}

// Todo se ejecuta al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const fontSelect = document.getElementById("fontSelect");
  const sizeSelect = document.getElementById("sizeSelect");
  const colorSelect = document.getElementById("colorSelect");
  const bgColorSelect = document.getElementById("bgColorSelect");
  const content = document.getElementById("mainContent");

  // Aplica los estilos guardados (fuente, tamaño, color, fondo)
  const aplicarEstilos = () => {
    const font = localStorage.getItem("font") || "Arial";
    const size = localStorage.getItem("size") || "16px";
    const color = localStorage.getItem("color") || "#000000";
    const fondo = localStorage.getItem("bgColor") || "#f8f9fa";

    if (content) {
      content.style.fontFamily = font;
      content.style.fontSize = size;
      content.style.backgroundColor = fondo;

      const elementosConTexto = content.querySelectorAll(
        "h1, h2, h3, h4, h5, p, div, span, select, i"
      );
      elementosConTexto.forEach((el) => {
        el.style.color = color;
      });
    }

    if (fontSelect) fontSelect.value = font;
    if (sizeSelect) sizeSelect.value = size;
    if (colorSelect) colorSelect.value = color;
    if (bgColorSelect) bgColorSelect.value = fondo;
  };

  aplicarEstilos();

  // Eventos para seleccionar estilos
  if (fontSelect) {
    fontSelect.addEventListener("change", () => {
      const font = fontSelect.value;
      localStorage.setItem("font", font);
      content.style.fontFamily = font;
    });
  }

  if (sizeSelect) {
    sizeSelect.addEventListener("change", () => {
      const size = sizeSelect.value;
      localStorage.setItem("size", size);
      content.style.fontSize = size;
    });
  }

  if (colorSelect) {
    colorSelect.addEventListener("input", () => {
      const color = colorSelect.value;
      localStorage.setItem("color", color);
      const elementos = content.querySelectorAll(
        "h1, h2, h3, h4, h5, p, div, span, select, i"
      );
      elementos.forEach((el) => {
        el.style.color = color;
      });
    });
  }

  if (bgColorSelect) {
    bgColorSelect.addEventListener("input", () => {
      const fondo = bgColorSelect.value;
      localStorage.setItem("bgColor", fondo);
      content.style.backgroundColor = fondo;
    });
  }
  // Gestión de tareas
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  const cargarTareas = () => {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    taskList.innerHTML = "";

    tareas.forEach((tarea, index) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";

      const estadoBadge =
        tarea.estado === "Realizada"
          ? '<span class="badge bg-success ms-2">Realizada</span>'
          : '<span class="badge bg-warning text-dark ms-2">Pendiente</span>';

      // Botón para marcar como realizada si no lo está
      const botonRealizar =
        tarea.estado !== "Realizada"
          ? `<button class="btn btn-success btn-sm me-2" onclick="marcarRealizada(${index})">Marcar como realizada</button>`
          : "";

      li.innerHTML = `
      <div>
        <strong>${tarea.titulo}</strong> ${estadoBadge}<br>
        <small>${tarea.descripcion}</small><br>
        <em>Vence: ${tarea.fecha}</em>
      </div>
      <div>
        ${botonRealizar}
        <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">Eliminar</button>
      </div>
    `;
      taskList.appendChild(li);
    });
  };
  
  window.eliminarTarea = (index) => {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
  };

  window.marcarRealizada = (index) => {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas[index].estado = "Realizada";
    localStorage.setItem("tareas", JSON.stringify(tareas));
    cargarTareas();
  };

  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevaTarea = {
        titulo: document.getElementById("taskTitle").value.trim(),
        descripcion: document.getElementById("taskDescription").value.trim(),
        fecha: document.getElementById("taskDueDate").value,
        estado: "Pendiente",
      };

      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      tareas.push(nuevaTarea);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      taskForm.reset();
      cargarTareas();
    });
  }

  cargarTareas(); // Mostrar tareas al cargar

  // Listado de tareas pendientes.
  
  const listaPendientes = document.getElementById("listaPendientes"); 
  localStorage.getItem("tareas")

  if (listaPendientes) {
    const mostrarPendientes = () => {
      console.log("Mostrando tareas pendientes..."); // ← agrega esto
  
      const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      const pendientes = tareas.filter((t) => t.estado === "Pendiente");
  
      if (pendientes.length === 0) {
        listaPendientes.innerHTML =
          '<li class="list-group-item text-center text-muted">No hay tareas pendientes</li>';
        return;
      }
  
      listaPendientes.innerHTML = "";
  
      pendientes.forEach((tarea) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <div>
            <strong>${tarea.titulo}</strong><br>
            <small>${tarea.descripcion}</small><br>
            <em>Vence: ${tarea.fecha}</em>
          </div>
        `;
        listaPendientes.appendChild(li);
      });
    };
  
    mostrarPendientes(); // ← esta línea es clave
  }
  
});

// lista de tareas eliminada.

// document.addEventListener("DOMContentLoaded", () => {
//   const mainContent = document.getElementById("mainContent");

//   const mostrarEliminadas = () => {
//     const tareasEliminadas = JSON.parse(localStorage.getItem("tareasEliminadas")) || [];

//     const container = document.createElement("ul");
//     container.className = "list-group";

//     if (tareasEliminadas.length === 0) {
//       container.innerHTML = `<li class="list-group-item text-center text-muted">No hay tareas eliminadas</li>`;
//     } else {
//       tareasEliminadas.forEach((tarea) => {
//         const li = document.createElement("li");
//         li.className = "list-group-item";
//         li.innerHTML = `
//           <strong>${tarea.titulo}</strong><br>
//           <small>${tarea.descripcion}</small><br>
//           <em>Vencía: ${tarea.fecha}</em>
//         `;
//         container.appendChild(li);
//       });
//     }

//     // Reemplazar el contenido actual
//     mainContent.querySelector("p").remove(); // quitar el párrafo "Aquí va el contenido de tu app."
//     mainContent.appendChild(container);
//   };

//   mostrarEliminadas();