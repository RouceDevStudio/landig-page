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

document.querySelector("#numero").addEventListener("input", function() {
    let input = this;
    let value = input.value.replace(/\D/g, '');  // Eliminar caracteres no numéricos
    if (value.length < 10) {
      input.setCustomValidity("Por favor, ingresa un número de teléfono válido.");
    } else {
      input.setCustomValidity("");
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const animElements = document.querySelectorAll(
    ".anim-fade-in, .anim-slide-up, .anim-zoom-in, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  animElements.forEach((el) => observer.observe(el));
});


const contenedor = document.getElementById("planes");
  const siguiente = document.getElementById("next");
  const anterior = document.getElementById("prev");

  // Calculamos el ancho de un artículo + margen
  function getCardWidth() {
    const plan = contenedor.querySelector(".plan");
    const styles = window.getComputedStyle(plan);
    const margin = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    return plan.offsetWidth + margin + 25; // 25px es el gap que tú usaste
  }

  siguiente.addEventListener("click", () => {
    contenedor.scrollLeft += getCardWidth();
  });

  anterior.addEventListener("click", () => {
    contenedor.scrollLeft -= getCardWidth();
  });


  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contacto");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("Nombre").value;
        const email = document.getElementById("E-mail").value;
        const servicio = document.getElementById("servicio").value;
        const plan = document.getElementById("plan").value;
        const telefono = document.getElementById("numero").value;

        const datos = {
            nombre,
            telefono,
            notas: `Servicio: ${servicio} | Plan: ${plan}`,
            empleado: "Formulario landing page"
        };

        try {
            const res = await fetch("https://inventario-backend-qf0d.onrender.com/api/enviar-correo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Formulario enviado con éxito 🚀");
                form.reset(); // Limpia el formulario
            } else {
                alert("Error al enviar: " + data.message);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error de conexión con el servidor.");
        }
    });
});