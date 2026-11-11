
const buscar = document.getElementById("buscar");
const estado = document.getElementById("filtroEstado");
const cuerpo = document.getElementById("cuerpoCalles");

// Filtrar carreteras
function filtrar() {
    const texto = buscar.value.trim().toLowerCase();

    const resultados = VIAL.carreteras.filter(function(carretera) {
        const coincideNombre = carretera.nombre
            .toLowerCase()
            .includes(texto);

        const coincideEstado =
            estado.value === "Todos" ||
            carretera.estado === estado.value;

        return coincideNombre && coincideEstado;
    });

    cuerpo.replaceChildren();

    resultados.forEach(function(carretera) {
        const fila = document.createElement("tr");

        const celdaEstado = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className =
            "estado " + carretera.estado.toLowerCase();

        etiqueta.textContent = carretera.estado;

        celdaEstado.appendChild(etiqueta);

        fila.appendChild(celda(carretera.nombre));
        fila.appendChild(celdaEstado);
        fila.appendChild(celda(formatoFecha(carretera.actualizacion)));

        cuerpo.appendChild(fila);
    });

    document.getElementById("cantidadResultados").textContent =
        "Resultados encontrados: " + resultados.length;

    document.getElementById("sinResultados").hidden =
        resultados.length !== 0;
}

// Eventos
buscar.addEventListener("input", filtrar);
estado.addEventListener("change", filtrar);

// Cargar carreteras
filtrar();
