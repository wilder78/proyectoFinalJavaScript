// Funcion para listar las tareas eliminadas.
function obtenerTareasEliminadas() {
  return JSON.parse(localStorage.getItem("tareasEliminadas")) || [];
}

function mostrarTareasEliminadas() {
  const tareasEliminadas = obtenerTareasEliminadas();
  const lista = document.getElementById("taskDeletedList");
  if (lista) lista.innerHTML = "";

  if (tareasEliminadas.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center text-muted";
    li.textContent = "No hay tareas eliminadas.";
    lista.appendChild(li);
    return;
  }

  tareasEliminadas.forEach((tarea) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        <strong>${tarea.titulo}</strong><br>
        <small>${tarea.descripcion}</small><br>
        <em>Vencía: ${tarea.fecha}</em>
      `;
    lista.appendChild(li);
  });
}

// Mostrar tareas eliminadas al cargar la página
document.addEventListener("DOMContentLoaded", mostrarTareasEliminadas);
