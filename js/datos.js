
// Datos ficticios del Sistema Vial CR
window.VIAL = {

    // Incidentes viales
    incidentes: [

        {
            id: 1,
            carretera: "Ruta 2",
            tipo: "Accidente",
            descripcion: "Colision de vehiculos",
            fecha: "2026-11-05",
            estado: "Activo",
            provincia: "Cartago",
            canton: "Cartago",
            referencia: "Sector cercano a metropoli",
            latitud: 9.8644,
            longitud: -83.9194
        },

        {
            id: 2,
            carretera: "Ruta 27",
            tipo: "Congestionamiento",
            descripcion: "Transito lento",
            fecha: "2026-11-06",
            estado: "Activo",
            provincia: "San Jose",
            canton: "Santa Ana",
            referencia: "Tramo de la carretera",
            latitud: 9.9325,
            longitud: -84.1820
        },

        {
            id: 3,
            carretera: "Ruta 1",
            tipo: "Obstaculo",
            descripcion: "Vehiculo detenido",
            fecha: "2026-11-04",
            estado: "Resuelto",
            provincia: "Alajuela",
            canton: "Alajuela",
            referencia: "Carretera principal",
            latitud: 10.0163,
            longitud: -84.2116
        },

        {
            id: 4,
            carretera: "Ruta 32",
            tipo: "Cierre",
            descripcion: "Trabajos en carretera",
            fecha: "2026-11-07",
            estado: "Activo",
            provincia: "Limon",
            canton: "Pococi",
            referencia: "Sector con trabajos viales",
            latitud: 10.2150,
            longitud: -83.7860
        },

        {
            id: 5,
            carretera: "Ruta 10",
            tipo: "Congestionamiento",
            descripcion: "Alta cantidad de vehiculos",
            fecha: "2026-11-08",
            estado: "Activo",
            provincia: "Cartago",
            canton: "Turrialba",
            referencia: "Sector cercano al centro",
            latitud: 9.9047,
            longitud: -83.6835
        }

    ],


    // Estado de carreteras
    carreteras: [

        {
            nombre: "Ruta 1",
            estado: "Disponible",
            actualizacion: "2026-11-04"
        },

        {
            nombre: "Ruta 2",
            estado: "Congestionada",
            actualizacion: "2026-11-05"
        },

        {
            nombre: "Ruta 10",
            estado: "Congestionada",
            actualizacion: "2026-11-08"
        },

        {
            nombre: "Ruta 27",
            estado: "Congestionada",
            actualizacion: "2026-11-06"
        },

        {
            nombre: "Ruta 32",
            estado: "Cerrada",
            actualizacion: "2026-11-07"
        }

    ],


    // Rutas alternativas ficticias
    rutas: [

        {
            principal: "Ruta 2",
            problema: "Accidente",
            alternativa: "Ruta 10",
            motivo: "Accidente registrado en la Ruta 2."
        },

        {
            principal: "Ruta 27",
            problema: "Congestionamiento",
            alternativa: "Ruta 3",
            motivo: "Transito lento en la Ruta 27."
        },

        {
            principal: "Ruta 32",
            problema: "Cierre",
            alternativa: "Ruta 10",
            motivo: "Cierre registrado en la Ruta 32."
        }

    ],


    // Alertas viales ficticias
    alertas: [

        {
            carretera: "Ruta 2",
            titulo: "Accidente en Ruta 2",
            descripcion: "Colision de vehiculos.",
            prioridad: "Alta",
            fecha: "2026-11-05",
            provincia: "Cartago",
            canton: "Cartago",
            referencia: "Sector cercano a metropoli"
        },

        {
            carretera: "Ruta 27",
            titulo: "Transito lento en Ruta 27",
            descripcion: "Congestionamiento registrado.",
            prioridad: "Media",
            fecha: "2026-11-06",
            provincia: "San Jose",
            canton: "Santa Ana",
            referencia: "Tramo de la carretera"
        },

        {
            carretera: "Ruta 1",
            titulo: "Obstaculo retirado de Ruta 1",
            descripcion: "Incidente resuelto.",
            prioridad: "Baja",
            fecha: "2026-11-04",
            provincia: "Alajuela",
            canton: "Alajuela",
            referencia: "Carretera principal"
        }

    ]

};


// Convertir fecha al formato dia/mes/anio
window.formatoFecha = function (fecha) {

    const [anio, mes, dia] = fecha.split("-");

    return dia + "/" + mes + "/" + anio;

};


// Crear una celda para las tablas
window.celda = function (texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

};


// Agregar un dato con etiqueta
window.parDetalle = function (contenedor, etiqueta, valor) {

    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = etiqueta + ": ";

    p.appendChild(strong);
    p.appendChild(document.createTextNode(valor));

    contenedor.appendChild(p);

};
