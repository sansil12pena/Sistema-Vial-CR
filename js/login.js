
const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensajeLogin");

// Validar inicio de sesion
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    mensaje.textContent = "";
    mensaje.className = "";

    if (!form.reportValidity()) {
        return;
    }

    mensaje.className = "mensaje";

    mensaje.textContent =
        "Datos validados. El inicio de sesion estara disponible cuando se conecte el backend.";
});
