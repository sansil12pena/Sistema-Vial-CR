
const filtro = document.getElementById("filtroRuta");
const cuerpo = document.getElementById("cuerpoRutas");
const modal = document.getElementById("ventanaRuta");

// Mostrar informacion de una ruta
function detalle(ruta) {
    const contenido = document.getElementById("contenidoRuta");

    contenido.replaceChildren();

    const campos = [
        ["Ruta principal", ruta.principal],
        ["Problema", ruta.problema],
        ["Ruta alternativa", ruta.alternativa],
        ["Motivo", ruta.motivo]
    ];

    campos.forEach(function(campo) {
        parDetalle(contenido, campo[0], campo[1]);
    });

    modal.showModal();
}

// Filtrar rutas
function filtrar() {
    const resultados = VIAL.rutas.filter(function(ruta) {
        return filtro.value === "Todas" ||
               ruta.principal === filtro.value;
    });

    cuerpo.replaceChildren();

    resultados.forEach(function(ruta) {
        const fila = document.createElement("tr");
        const celdaAlternativa = document.createElement("td");

        const nombre = document.createElement("span");
        nombre.textContent = ruta.alternativa;

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "boton boton-pequeno";
        boton.textContent = "Ver informacion";

        boton.addEventListener("click", function() {
            detalle(ruta);
        });

        celdaAlternativa.appendChild(nombre);
        celdaAlternativa.appendChild(boton);

        fila.appendChild(celda(ruta.principal));
        fila.appendChild(celda(ruta.problema));
        fila.appendChild(celdaAlternativa);

        cuerpo.appendChild(fila);
    });

    document.getElementById("cantidadRutas").textContent =
        "Rutas encontradas: " + resultados.length;

    document.getElementById("sinRutas").hidden =
        resultados.length !== 0;
}

// Eventos
filtro.addEventListener("change", filtrar);

document.getElementById("cerrarRuta")
    .addEventListener("click", function() {
        modal.close();
    });

// Cargar rutas
filtrar();
