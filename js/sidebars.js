// Función boton de salida.  
function confirmarSalida() {
    const confirmacion = confirm("¿Estás seguro de que deseas salir?");
    if (confirmacion) {
      window.location.href = "../index.html"; // Redirige a index.html
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const fontSelect = document.getElementById("fontSelect");
    const sizeSelect = document.getElementById("sizeSelect");
    const colorSelect = document.getElementById("colorSelect");
    const content = document.getElementById("mainContent"); // Asegúrate de que este ID exista en tu HTML
  
    if (fontSelect && sizeSelect && content) {
      fontSelect.addEventListener("change", () => {
        content.style.fontFamily = fontSelect.value;
      });
  
      sizeSelect.addEventListener("change", () => {
        content.style.fontSize = sizeSelect.value;
      });
  
      if (colorSelect) {
        colorSelect.addEventListener("input", () => {
          content.style.color = colorSelect.value;
        });
      }
    }
  });
  

