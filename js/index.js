document.addEventListener("DOMContentLoaded", function () {
    const darkModeBtn = document.getElementById("toggle-dark-mode");
    const body = document.body;
    let isDarkMode = localStorage.getItem("darkMode") === "true";
  
    function applyDarkMode(isDark) {
      const icon = darkModeBtn?.querySelector("i");
  
      if (isDark) {
        body.classList.add("dark-mode");
        icon?.classList.replace("bi-moon", "bi-sun");
        darkModeBtn?.setAttribute("title", "Cambiar a modo claro");
      } else {
        body.classList.remove("dark-mode");
        icon?.classList.replace("bi-sun", "bi-moon");
        darkModeBtn?.setAttribute("title", "Cambiar a modo oscuro");
      }
    }
  
    body.classList.add("no-transition");
    applyDarkMode(isDarkMode);
    setTimeout(() => body.classList.remove("no-transition"), 100);
  
    if (darkModeBtn) {
      darkModeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        isDarkMode = !isDarkMode;
        localStorage.setItem("darkMode", isDarkMode);
        applyDarkMode(isDarkMode);
  
        const icon = this.querySelector("i");
        icon.style.animation = "none";
        void icon.offsetWidth;
        icon.style.animation = "rotate 0.5s ease";
      });
    }
  
    // REGISTRO DE USUARIOS
    const formRegistro = document.getElementById("registroForm");
    if (formRegistro) {
      formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
  
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneNumero = /\d/.test(password);
        const tieneSimbolo = /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?¡¿]/.test(password);
  
        if (!tieneMayuscula || !tieneNumero || !tieneSimbolo) {
          alert("La contraseña debe contener al menos:\n- Una letra mayúscula\n- Un número\n- Un símbolo especial.");
          return;
        }
  
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const yaExiste = usuarios.some((usuario) => usuario.email === email);
  
        if (yaExiste) {
          alert("El correo ya está registrado. Intenta con otro.");
          return;
        }
  
        const nuevoUsuario = { email, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
        alert(`¡Bienvenido ${email}! Tu cuenta ha sido registrada.`);
        formRegistro.reset();
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
  
        // Obtener usuarios del localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
  
        // Buscar si hay un usuario que coincida con email y contraseña
        const usuarioEncontrado = usuariosRegistrados.find(
          (usuario) => usuario.email === email && usuario.password === password
        );
  
        if (usuarioEncontrado) {
          // Guardar usuario activo (opcional)
          localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
  
          // Redirigir a tasks.html
          window.location.href = "tasksPage.html";
        } else {
          alert("Correo o contraseña incorrectos.");
        }
      });
    }
  });
  
  