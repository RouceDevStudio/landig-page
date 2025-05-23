const botonMenu = document.querySelector(".boton-abrir-menu");
const navMenu = document.querySelector(".ocultar-nav");

botonMenu.addEventListener("click", (e) => {
  e.stopPropagation(); // Para evitar que se dispare el otro click
  botonMenu.classList.toggle("boton-activar-menu");
  navMenu.classList.toggle("visible-nav");
});

// Aquí el error era que no recibías el evento
document.addEventListener("click", (e) => {
  // Si haces clic fuera del nav y fuera del botón
  if (!navMenu.contains(e.target) && !botonMenu.contains(e.target)) {
    navMenu.classList.remove("visible-nav");
    botonMenu.classList.remove("boton-activar-menu");
  }
});

const darkMode = document.querySelector("#dark-mode");

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
})


  // Espera a que cargue todo el DOM
  const updateThemeColor = () => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const themeColor = getComputedStyle(document.documentElement)
                        .getPropertyValue('--fondo-blanco-menu')
                        .trim();
    metaThemeColor.setAttribute('content', themeColor);
  };

  // Cambia apenas cargue
  window.addEventListener('DOMContentLoaded', updateThemeColor);

  // Detecta si el sistema cambia entre claro/oscuro
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateThemeColor);



document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector(".registro");

    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value;

        const nuevoUsuario = {
            name,
            email,
            password
        };

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Usuario registrado con éxito");
                window.location.href = "/login-registro/login.html"; // Cambia esto si tu login está en otra ruta
            } else {
                alert("Error al registrar: " + data.message);
            }

        } catch (error) {
            console.error("Error de red:", error);
            alert("No se pudo conectar al servidor");
        }
    });
});
