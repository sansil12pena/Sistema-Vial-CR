
// Elementos de la pagina
const buscar = document.getElementById("buscarCarretera");
const prioridad = document.getElementById("prioridad");
const lista = document.getElementById("listaAlertas");

const cantidad = document.getElementById("cantidadAlertas");
const sinAlertas = document.getElementById("sinAlertas");


// Filtrar y mostrar alertas
function filtrar() {

    const texto = buscar.value.trim().toLowerCase();

    // Buscar coincidencias
    const resultados = VIAL.alertas.filter(function(alerta) {

        const coincideCarretera = alerta.carretera
            .toLowerCase()
            .includes(texto);

        const coincidePrioridad =
            prioridad.value === "Todas" ||
            alerta.prioridad === prioridad.value;

        return coincideCarretera && coincidePrioridad;
    });


    // Limpiar las tarjetas anteriores
    lista.replaceChildren();


    // Crear una tarjeta por cada alerta
    resultados.forEach(function(alerta) {

        const tarjeta = document.createElement("article");

        tarjeta.className =
            "alerta " + alerta.prioridad.toLowerCase();


        // Titulo
        const titulo = document.createElement("h3");
        titulo.textContent = alerta.titulo;

        tarjeta.appendChild(titulo);


        // Informacion de la alerta
        const campos = [
            ["Carretera", alerta.carretera],
            ["Provincia", alerta.provincia],
            ["Canton", alerta.canton],
            ["Punto de referencia", alerta.referencia],
            ["Descripcion", alerta.descripcion],
            ["Prioridad", alerta.prioridad],
            ["Fecha", formatoFecha(alerta.fecha)]
        ];


        // Agregar informacion a la tarjeta
        campos.forEach(function(campo) {

            parDetalle(
                tarjeta,
                campo[0],
                campo[1]
            );

        });


        // Agregar tarjeta a la pagina
        lista.appendChild(tarjeta);

    });


    // Mostrar cantidad de resultados
    cantidad.textContent =
        "Alertas encontradas: " + resultados.length;


    // Mostrar mensaje si no hay alertas
    sinAlertas.hidden = resultados.length !== 0;

}


// Eventos de los filtros
buscar.addEventListener("input", filtrar);

prioridad.addEventListener("change", filtrar);


// Cargar las alertas al abrir la pagina
filtrar();
