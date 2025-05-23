
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
    console.log("✅ DOM cargado");

    const formLogin = document.querySelector(".login");

    if (!formLogin) {
        alert("❌ No se encontró el formulario de login.");
        return;
    }

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email")?.value?.trim();
        const password = document.querySelector("#password")?.value;

        if (!email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        console.log("📤 Enviando login:", { email, password });

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log("📥 Respuesta del backend:", data);

            if (res.ok) {
                alert("✅ Inicio de sesión exitoso");
                localStorage.setItem("usuario", JSON.stringify(data.user));
                window.location.href = "/index.html";
            } else {
                alert("❌ Login fallido: " + (data.message || "Error desconocido"));
            }

        } catch (error) {
            console.error("🚨 Error al conectarse:", error);
            alert("❌ No se pudo conectar con el servidor.");
        }
    });
});
