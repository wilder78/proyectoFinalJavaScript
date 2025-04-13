document.addEventListener('DOMContentLoaded', function() {
    const darkModeBtn = document.getElementById('toggle-dark-mode');
    const body = document.body;
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Función mejorada para aplicar modo oscuro
    function applyDarkMode(isDark) {
        const icon = darkModeBtn.querySelector('i');
        
        if (isDark) {
            body.classList.add('dark-mode');
            icon.classList.replace('bi-moon', 'bi-sun');
            darkModeBtn.setAttribute('title', 'Cambiar a modo claro');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.replace('bi-sun', 'bi-moon');
            darkModeBtn.setAttribute('title', 'Cambiar a modo oscuro');
        }
    }

    // Cargar estado inicial mejorado
    body.classList.add('no-transition'); // Desactiva transiciones iniciales
    applyDarkMode(isDarkMode);
    setTimeout(() => body.classList.remove('no-transition'), 100);

    // Event listener optimizado
    darkModeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyDarkMode(isDarkMode);
        
        // Animación mejorada
        const icon = this.querySelector('i');
        icon.style.animation = 'none';
        void icon.offsetWidth; // Trigger reflow
        icon.style.animation = 'rotate 0.5s ease';
    });
});

/* Codio de registro del email. */
document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validaciones
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneSimbolo = /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?¡¿]/.test(password);

    if (!tieneMayuscula || !tieneNumero || !tieneSimbolo) {
        alert("La contraseña debe contener al menos:\n- Una letra mayúscula\n- Un número\n- Un símbolo especial (como */-+.$%&?¡!)");
        return;
    }

    // Obtener usuarios actuales del localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si el correo ya está registrado
    const yaExiste = usuarios.some(usuario => usuario.email === email);

    if (yaExiste) {
        alert("El correo ya está registrado. Intenta con otro.");
        return;
    }

    // Registrar nuevo usuario
    const nuevoUsuario = { email, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    document.getElementById('registroForm').reset();
});

