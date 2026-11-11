
const buscar = document.getElementById("buscar");
const estado = document.getElementById("filtroEstado");
const fecha = document.getElementById("filtroFecha");

const cuerpo = document.getElementById("cuerpoIncidentes");
const modal = document.getElementById("ventanaDetalle");

// Mostrar detalle del incidente
function verDetalle(incidente) {
    document.getElementById("tituloDetalle").textContent =
        "Detalle del incidente #" + incidente.id;

    const contenido = document.getElementById("contenidoDetalle");
    contenido.replaceChildren();

    const campos = [
        ["Carretera", incidente.carretera],
        ["Tipo", incidente.tipo],
        ["Descripcion", incidente.descripcion],
        ["Fecha", formatoFecha(incidente.fecha)],
        ["Estado", incidente.estado],
        ["Provincia", incidente.provincia],
        ["Canton", incidente.canton],
        ["Referencia", incidente.referencia]
    ];

    campos.forEach(function(campo) {
        parDetalle(contenido, campo[0], campo[1]);
    });

    modal.showModal();
}

// Buscar y filtrar incidentes
function filtrar() {
    const texto = buscar.value.trim().toLowerCase();

    const resultados = VIAL.incidentes.filter(function(incidente) {
        const informacion = [
            incidente.carretera,
            incidente.tipo,
            incidente.descripcion,
            incidente.provincia,
            incidente.canton
        ].join(" ").toLowerCase();

        const coincideTexto = informacion.includes(texto);

        const coincideEstado =
            estado.value === "Todos" ||
            incidente.estado === estado.value;

        const coincideFecha =
            !fecha.value ||
            incidente.fecha === fecha.value;

        return coincideTexto && coincideEstado && coincideFecha;
    });

    cuerpo.replaceChildren();

    resultados.forEach(function(incidente) {
        const fila = document.createElement("tr");

        [
            incidente.id,
            incidente.carretera,
            incidente.tipo,
            incidente.provincia,
            formatoFecha(incidente.fecha)
        ].forEach(function(valor) {
            fila.appendChild(celda(valor));
        });

        const celdaEstado = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className =
            "estado " + incidente.estado.toLowerCase();

        etiqueta.textContent = incidente.estado;

        celdaEstado.appendChild(etiqueta);
        fila.appendChild(celdaEstado);

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "boton boton-pequeno";
        boton.textContent = "Ver detalle";

        boton.addEventListener("click", function() {
            verDetalle(incidente);
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);

        cuerpo.appendChild(fila);
    });

    document.getElementById("cantidadResultados").textContent =
        "Incidentes encontrados: " + resultados.length;

    document.getElementById("sinResultados").hidden =
        resultados.length !== 0;
}

// Eventos
buscar.addEventListener("input", filtrar);
estado.addEventListener("change", filtrar);
fecha.addEventListener("change", filtrar);

// Limpiar filtros
document.getElementById("limpiarFiltros")
    .addEventListener("click", function() {
        buscar.value = "";
        estado.value = "Todos";
        fecha.value = "";

        filtrar();
        buscar.focus();
    });

// Cerrar ventana
document.getElementById("cerrarDetalle")
    .addEventListener("click", function() {
        modal.close();
    });

// Cargar incidentes
filtrar();
