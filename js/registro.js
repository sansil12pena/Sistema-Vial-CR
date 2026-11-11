
const form = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const clave = document.getElementById("contrasena");
const confirmar = document.getElementById("confirmarContrasena");

const mensaje = document.getElementById("mensajeRegistro");

// Limpiar error anterior
function limpiarError() {
    confirmar.setCustomValidity("");
}

confirmar.addEventListener("input", limpiarError);
clave.addEventListener("input", limpiarError);

// Validar registro
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    limpiarError();

    mensaje.textContent = "";
    mensaje.className = "";

    if (!form.reportValidity()) {
        return;
    }

    if (nombre.value.trim().length < 3) {
        mensaje.className = "error";

        mensaje.textContent =
            "Ingrese un nombre de al menos 3 caracteres.";

        nombre.focus();
        return;
    }

    if (clave.value !== confirmar.value) {
        confirmar.setCustomValidity(
            "Las contrasenas no coinciden."
        );

        confirmar.reportValidity();

        mensaje.className = "error";
        mensaje.textContent = "Las contrasenas no coinciden.";

        return;
    }

    mensaje.className = "mensaje";

    mensaje.textContent =
        "Datos validados. No se creo ninguna cuenta.";
});
