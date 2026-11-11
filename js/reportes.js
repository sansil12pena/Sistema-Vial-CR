
// Elementos del formulario
const form = document.getElementById("formReporte");
const fecha = document.getElementById("fecha");
const descripcion = document.getElementById("descripcion");
const referencia = document.getElementById("referencia");
const mensaje = document.getElementById("mensajeReporte");

const contador = document.getElementById("contadorCaracteres");
const estado = document.getElementById("estadoDescripcion");

const provincia = document.getElementById("provincia");
const canton = document.getElementById("canton");
const calle = document.getElementById("calle");

const grupoOtraCalle = document.getElementById("grupoOtraCalle");
const otraCalle = document.getElementById("otraCalle");


// Cantones por provincia
const cantones = {
    "San Jose": [
        "San Jose", "Escazu", "Desamparados", "Puriscal",
        "Tarrazu", "Aserri", "Mora", "Goicoechea",
        "Santa Ana", "Alajuelita", "Vazquez de Coronado",
        "Acosta", "Tibas", "Moravia", "Montes de Oca",
        "Turrubares", "Dota", "Curridabat",
        "Perez Zeledon", "Leon Cortes Castro"
    ],

    "Alajuela": [
        "Alajuela", "San Ramon", "Grecia", "San Mateo",
        "Atenas", "Naranjo", "Palmares", "Poas",
        "Orotina", "San Carlos", "Zarcero", "Sarchi",
        "Upala", "Los Chiles", "Guatuso", "Rio Cuarto"
    ],

    "Cartago": [
        "Cartago", "Paraiso", "La Union", "Jimenez",
        "Turrialba", "Alvarado", "Oreamuno", "El Guarco"
    ],

    "Heredia": [
        "Heredia", "Barva", "Santo Domingo",
        "Santa Barbara", "San Rafael", "San Isidro",
        "Belen", "Flores", "San Pablo", "Sarapiqui"
    ],

    "Guanacaste": [
        "Liberia", "Nicoya", "Santa Cruz", "Bagaces",
        "Carrillo", "Canas", "Abangares", "Tilaran",
        "Nandayure", "La Cruz", "Hojancha"
    ],

    "Puntarenas": [
        "Puntarenas", "Esparza", "Buenos Aires",
        "Montes de Oro", "Osa", "Quepos", "Golfito",
        "Coto Brus", "Parrita", "Corredores",
        "Garabito", "Monteverde", "Puerto Jimenez"
    ],

    "Limon": [
        "Limon", "Pococi", "Siquirres",
        "Talamanca", "Matina", "Guacimo"
    ]
};


// Rutas de ejemplo por provincia
// No representan el catalogo vial completo de Costa Rica
const rutasPorProvincia = {
    "San Jose": ["Ruta 1", "Ruta 2", "Ruta 27", "Ruta 32"],
    "Alajuela": ["Ruta 1", "Ruta 27"],
    "Cartago": ["Ruta 2", "Ruta 10"],
    "Heredia": ["Ruta 1", "Ruta 32"],
    "Guanacaste": ["Ruta 1"],
    "Puntarenas": ["Ruta 1", "Ruta 2", "Ruta 27"],
    "Limon": ["Ruta 32"]
};


// Crear una opcion en un selector
function agregarOpcion(selector, valor, texto) {
    const opcion = document.createElement("option");

    opcion.value = valor;
    opcion.textContent = texto;

    selector.appendChild(opcion);
}


// Mostrar u ocultar el campo de otra carretera
function actualizarOtraCalle() {
    const mostrarCampo =
        calle.value === "Otra carretera o calle local";

    grupoOtraCalle.hidden = !mostrarCampo;
    otraCalle.required = mostrarCampo;

    if (!mostrarCampo) {
        otraCalle.value = "";
    }
}


// Reiniciar el selector de carreteras
function reiniciarCarreteras() {
    calle.innerHTML = "";

    agregarOpcion(
        calle,
        "",
        "Primero seleccione un canton"
    );

    calle.disabled = true;

    actualizarOtraCalle();
}


// Reiniciar el selector de cantones
function reiniciarCantones() {
    canton.innerHTML = "";

    agregarOpcion(
        canton,
        "",
        "Primero seleccione una provincia"
    );

    canton.disabled = true;
}


// Cambiar provincia
provincia.addEventListener("change", function() {

    reiniciarCantones();
    reiniciarCarreteras();

    if (provincia.value === "") {
        return;
    }

    canton.innerHTML = "";

    agregarOpcion(
        canton,
        "",
        "Seleccione un canton"
    );

    const listaCantones = cantones[provincia.value] || [];

    listaCantones.forEach(function(nombre) {
        agregarOpcion(canton, nombre, nombre);
    });

    canton.disabled = false;
});


// Cambiar canton
canton.addEventListener("change", function() {

    reiniciarCarreteras();

    if (canton.value === "") {
        return;
    }

    calle.innerHTML = "";

    agregarOpcion(
        calle,
        "",
        "Seleccione una carretera"
    );

    const rutas = rutasPorProvincia[provincia.value] || [];

    rutas.forEach(function(ruta) {
        agregarOpcion(calle, ruta, ruta);
    });

    agregarOpcion(
        calle,
        "Otra carretera o calle local",
        "Otra carretera o calle local"
    );

    calle.disabled = false;
});


// Cambiar carretera
calle.addEventListener("change", actualizarOtraCalle);


// Obtener fecha actual
function hoy() {
    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");

    return anio + "-" + mes + "-" + dia;
}


// Evitar fechas futuras
fecha.max = hoy();


// Actualizar contador de caracteres
function actualizar() {
    contador.textContent =
        descripcion.value.length + " / 500 caracteres";

    const valido = descripcion.value.trim().length >= 10;

    estado.textContent = valido
        ? "Longitud minima cumplida"
        : "Minimo 10 caracteres";

    estado.className = valido
        ? "texto-correcto"
        : "texto-ayuda";
}


// Mostrar mensaje de validacion
function mostrar(texto, error) {
    mensaje.textContent = texto;

    mensaje.className = error
        ? "error"
        : "mensaje";
}


// Actualizar contador mientras se escribe
descripcion.addEventListener("input", actualizar);


// Limpiar formulario
document.getElementById("limpiarFormulario")
    .addEventListener("click", function() {

        form.reset();

        reiniciarCantones();
        reiniciarCarreteras();

        mensaje.textContent = "";
        mensaje.className = "";

        actualizar();
    });


// Validar formulario
form.addEventListener("submit", function(evento) {

    evento.preventDefault();

    mensaje.textContent = "";
    mensaje.className = "";

    // Validaciones HTML
    if (!form.reportValidity()) {
        return;
    }

    // Validar nombre de otra carretera
    if (
        calle.value === "Otra carretera o calle local" &&
        otraCalle.value.trim().length < 3
    ) {
        mostrar(
            "Ingrese un nombre de carretera de al menos 3 caracteres.",
            true
        );

        otraCalle.focus();
        return;
    }

    // Validar fecha
    if (fecha.value > hoy()) {
        mostrar(
            "La fecha no puede ser futura.",
            true
        );

        fecha.focus();
        return;
    }

    // Validar punto de referencia
    if (referencia.value.trim().length < 5) {
        mostrar(
            "La referencia debe tener al menos 5 caracteres.",
            true
        );

        referencia.focus();
        return;
    }

    // Validar descripcion
    if (descripcion.value.trim().length < 10) {
        mostrar(
            "La descripcion debe tener al menos 10 caracteres.",
            true
        );

        descripcion.focus();
        return;
    }

    mostrar(
        "Datos validados correctamente. El reporte no fue guardado.",
        false
    );
});


// Inicializar formulario
reiniciarCantones();
reiniciarCarreteras();
actualizar();
