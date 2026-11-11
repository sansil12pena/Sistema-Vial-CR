
// Datos del sistema
const datos = VIAL;


// Incidentes activos
const incidentesActivos = datos.incidentes.filter(function(incidente) {
    return incidente.estado === "Activo";
});

document.getElementById("nIncidentes").textContent =
    incidentesActivos.length;

document.getElementById("subIncidentes").textContent =
    "De " + datos.incidentes.length + " registrados";


// Carreteras afectadas
const callesAfectadas = datos.carreteras.filter(function(carretera) {
    return carretera.estado !== "Disponible";
});

document.getElementById("nCalles").textContent =
    callesAfectadas.length;

document.getElementById("subCalles").textContent =
    "De " + datos.carreteras.length + " monitoreadas";


// Rutas alternativas
document.getElementById("nRutas").textContent =
    datos.rutas.length;


// Alertas de prioridad alta
const alertasAltas = datos.alertas.filter(function(alerta) {
    return alerta.prioridad === "Alta";
});

document.getElementById("nAlertas").textContent =
    alertasAltas.length;

document.getElementById("subAlertas").textContent =
    "De " + datos.alertas.length + " alertas";


// Crear barra de resumen
function crearBarra(contenedor, nombre, cantidad, maximo, claseColor) {

    const grupo = document.createElement("div");
    grupo.className = "grupo-barra";

    const encabezado = document.createElement("div");
    encabezado.className = "barra-encabezado";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = nombre;

    const numero = document.createElement("strong");
    numero.textContent = cantidad;

    encabezado.appendChild(etiqueta);
    encabezado.appendChild(numero);

    const fondo = document.createElement("div");
    fondo.className = "barra-fondo";

    const barra = document.createElement("div");
    barra.className = "barra-progreso " + claseColor;

    // Calcular porcentaje de la barra
    const porcentaje = maximo > 0
        ? (cantidad / maximo) * 100
        : 0;

    barra.style.width = porcentaje + "%";

    fondo.appendChild(barra);

    grupo.appendChild(encabezado);
    grupo.appendChild(fondo);

    contenedor.appendChild(grupo);
}


// Grafico de incidentes por tipo
const graficoTipos = document.getElementById("graficoTipos");

const tipos = [
    "Accidente",
    "Congestionamiento",
    "Cierre",
    "Obstaculo"
];

tipos.forEach(function(tipo) {

    const cantidad = datos.incidentes.filter(function(incidente) {
        return incidente.tipo === tipo;
    }).length;

    crearBarra(
        graficoTipos,
        tipo,
        cantidad,
        datos.incidentes.length,
        "barra-azul"
    );
});


// Resumen por provincia
const resumenProvincias =
    document.getElementById("resumenProvincias");

const provincias = [
    "San Jose",
    "Alajuela",
    "Cartago",
    "Heredia",
    "Guanacaste",
    "Puntarenas",
    "Limon"
];

provincias.forEach(function(provincia) {

    const cantidad = datos.incidentes.filter(function(incidente) {
        return incidente.provincia === provincia;
    }).length;

    crearBarra(
        resumenProvincias,
        provincia,
        cantidad,
        datos.incidentes.length,
        "barra-verde"
    );
});


// Tres incidentes mas recientes
const cuerpo = document.getElementById("recientes");

const recientes = [...datos.incidentes]
    .sort(function(a, b) {
        return b.fecha.localeCompare(a.fecha);
    })
    .slice(0, 3);

recientes.forEach(function(incidente) {

    const fila = document.createElement("tr");

    fila.appendChild(celda(incidente.carretera));
    fila.appendChild(celda(incidente.tipo));
    fila.appendChild(celda(formatoFecha(incidente.fecha)));

    const celdaEstado = document.createElement("td");
    const estado = document.createElement("span");

    estado.className =
        "estado " + incidente.estado.toLowerCase();

    estado.textContent = incidente.estado;

    celdaEstado.appendChild(estado);
    fila.appendChild(celdaEstado);

    cuerpo.appendChild(fila);
});


// Alertas por prioridad
const resumenAlertas =
    document.getElementById("resumenAlertas");

const prioridades = [
    { nombre: "Alta", clase: "barra-roja" },
    { nombre: "Media", clase: "barra-naranja" },
    { nombre: "Baja", clase: "barra-verde" }
];

prioridades.forEach(function(prioridad) {

    const cantidad = datos.alertas.filter(function(alerta) {
        return alerta.prioridad === prioridad.nombre;
    }).length;

    crearBarra(
        resumenAlertas,
        prioridad.nombre,
        cantidad,
        datos.alertas.length,
        prioridad.clase
    );
});
