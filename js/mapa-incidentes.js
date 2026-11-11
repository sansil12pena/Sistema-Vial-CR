
//Aunque sea una tecnologia no vista en el curso, se investigo el tema, ya que al tratarse de congestionamiento vial era mejor un mapa
// Crear el mapa centrado en Costa Rica
const mapaIncidentes = L.map("mapaIncidentes").setView(
    [9.93, -84.0],
    9
);

// Agregar OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapaIncidentes);

// Guardar los marcadores para ajustar el mapa
const marcadores = [];

// Recorrer todos los incidentes registrados
window.VIAL.incidentes.forEach(function(incidente) {

    // Comprobar que el incidente tenga coordenadas
    if (
        typeof incidente.latitud !== "number" ||
        typeof incidente.longitud !== "number"
    ) {
        return;
    }

    // Crear el marcador
    const marcador = L.marker([
        incidente.latitud,
        incidente.longitud
    ]).addTo(mapaIncidentes);

    // Crear la informacion del incidente
    const informacion = document.createElement("div");

    window.parDetalle(
        informacion,
        "Carretera",
        incidente.carretera
    );

    window.parDetalle(
        informacion,
        "Tipo",
        incidente.tipo
    );

    window.parDetalle(
        informacion,
        "Ubicacion",
        incidente.canton + ", " + incidente.provincia
    );

    window.parDetalle(
        informacion,
        "Fecha",
        window.formatoFecha(incidente.fecha)
    );

    window.parDetalle(
        informacion,
        "Estado",
        incidente.estado
    );

    // Mostrar la informacion al hacer clic
    marcador.bindPopup(informacion);

    // Guardar el marcador
    marcadores.push(marcador);
});

// Ajustar el mapa para mostrar todos los incidentes
if (marcadores.length > 0) {
    const grupo = L.featureGroup(marcadores);

    mapaIncidentes.fitBounds(grupo.getBounds(), {
        padding: [30, 30],
        maxZoom: 12
    });
}
