
const reportesEjemplo = [
    {
        codigo: "REP-0001",
        tipo: "Accidente",
        provincia: "Cartago",
        canton: "Cartago",
        carretera: "Ruta 2",
        fecha: "2026-11-05",
        descripcion: "Colision de vehiculos.",
        estado: "Pendiente"
    },
    {
        codigo: "REP-0002",
        tipo: "Congestionamiento",
        provincia: "San Jose",
        canton: "Santa Ana",
        carretera: "Ruta 27",
        fecha: "2026-11-06",
        descripcion: "Transito lento en la carretera.",
        estado: "En revision"
    },
    {
        codigo: "REP-0003",
        tipo: "Obstaculo",
        provincia: "Alajuela",
        canton: "Alajuela",
        carretera: "Ruta 1",
        fecha: "2026-11-04",
        descripcion: "Vehiculo detenido en la carretera.",
        estado: "Atendido"
    }
];

const formulario = document.getElementById("formSeguimiento");
const codigoReporte = document.getElementById("codigoReporte");
const mensaje = document.getElementById("mensajeSeguimiento");
const resultado = document.getElementById("resultadoSeguimiento");
const detalle = document.getElementById("detalleSeguimiento");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const codigo = codigoReporte.value.trim().toUpperCase();

    const reporte = reportesEjemplo.find(function(elemento) {
        return elemento.codigo === codigo;
    });

    detalle.replaceChildren();
    resultado.hidden = true;
    mensaje.hidden = true;

    if (!reporte) {
        mensaje.textContent = "No se encontro un reporte con ese codigo.";
        mensaje.hidden = false;
        return;
    }

    parDetalle(detalle, "Codigo", reporte.codigo);
    parDetalle(detalle, "Tipo", reporte.tipo);
    parDetalle(detalle, "Provincia", reporte.provincia);
    parDetalle(detalle, "Canton", reporte.canton);
    parDetalle(detalle, "Carretera", reporte.carretera);
    parDetalle(detalle, "Fecha", formatoFecha(reporte.fecha));
    parDetalle(detalle, "Descripcion", reporte.descripcion);

    const parrafoEstado = document.createElement("p");

    const etiqueta = document.createElement("strong");
    etiqueta.textContent = "Estado: ";

    const estado = document.createElement("span");
    estado.className = "estado";

    if (reporte.estado === "Pendiente") {
        estado.classList.add("congestionada");
    } else if (reporte.estado === "En revision") {
        estado.classList.add("disponible");
    } else if (reporte.estado === "Atendido") {
        estado.classList.add("resuelto");
    } else {
        estado.classList.add("cerrada");
    }

    estado.textContent = reporte.estado;

    parrafoEstado.appendChild(etiqueta);
    parrafoEstado.appendChild(estado);
    detalle.appendChild(parrafoEstado);

    resultado.hidden = false;
});
