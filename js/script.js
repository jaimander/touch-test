// CREAR VARIABLES PARA LOS AUDIOS

let audioVentana1 = new Audio();
let audioVentana2 = new Audio();
let audioVentana3 = new Audio();
let audioVentana4 = new Audio();

// MOSTRAR Y OCULTAR VENTANAS

// ventana 1

let ventana1 = document.getElementById("ventana1");
let informacionVentana1 = document.getElementById("informacion-ventana1");
let visible1 = false;

ventana1.onclick = function () {
  if (visible1 == true) {
    visible1 = false;
    informacionVentana1.style.opacity = "0";
    audioVentana1.pause();
  } else {
    visible1 = true;
    informacionVentana1.style.opacity = "1";
    audioVentana1.play();
  }
};

// ventana 2

let ventana2 = document.getElementById("ventana2");
let informacionVentana2 = document.getElementById("informacion-ventana2");
let visible2 = false;

ventana2.onclick = function () {
  if (visible2 == true) {
    visible2 = false;
    informacionVentana2.style.opacity = "0";
    audioVentana2.pause();
  } else {
    visible2 = true;
    informacionVentana2.style.opacity = "1";
    audioVentana2.play();
  }
};

// ventana 3

let ventana3 = document.getElementById("ventana3");
let informacionVentana3 = document.getElementById("informacion-ventana3");
let visible3 = false;

ventana3.onclick = function () {
  if (visible3 == true) {
    visible3 = false;
    informacionVentana3.style.opacity = "0";
    audioVentana3.pause();
  } else {
    visible3 = true;
    informacionVentana3.style.opacity = "1";
    audioVentana3.play();
  }
};

// ventana 4

let ventana4 = document.getElementById("ventana4");
let informacionVentana4 = document.getElementById("informacion-ventana4");
let visible4 = false;

ventana4.onclick = function () {
  if (visible4 == true) {
    visible4 = false;
    informacionVentana4.style.opacity = "0";
    audioVentana4.pause();
  } else {
    visible4 = true;
    informacionVentana4.style.opacity = "1";
    audioVentana4.play();
  }
};

// MOSTRAR HORA LOCAL EN LA PÁGINA

let elementoHora = document.getElementById("hora");

function actualizarReloj() {
  let ahora = new Date();

  let horas = String(ahora.getHours()).padStart(2, "0");
  let minutos = String(ahora.getMinutes()).padStart(2, "0");
  let segundos = String(ahora.getSeconds()).padStart(2, "0");

  console.log(horas + ":" + minutos + ":" + segundos);

  elementoHora.textContent = horas + ":" + minutos + ":" + segundos;
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

// CARGAR DATOS Y ASIGNAR A LOS CONTENEDORES

let datos;

async function cargarDatos() {
  let respuesta = await fetch("datos.json");
  datos = await respuesta.json();

  actualizarContenido();
}

// Cargar los datos al iniciar
cargarDatos();

let textoVentana1 = document.getElementById("texto-ventana1");
let textoVentana2 = document.getElementById("texto-ventana2");
let textoVentana3 = document.getElementById("texto-ventana3");
let textoVentana4 = document.getElementById("texto-ventana4");

// actualizar contenido

function actualizarImagen(contenedor, url, textoAlternativo) {
  // Buscar si ya existe una imagen en el contenedor
  let imagen = contenedor.querySelector(".imagen-ventana");

  // Crear la imagen si todavía no existe
  if (!imagen) {
    imagen = document.createElement("img");
    imagen.className = "imagen-ventana";
    imagen.alt = textoAlternativo;

    contenedor.appendChild(imagen);
  }

  // Actualizar la imagen únicamente si cambia su URL
  if (url && imagen.src !== new URL(url, document.baseURI).href) {
    imagen.src = url;
  }

  imagen.alt = textoAlternativo || "Imagen de la ventana";
  imagen.style.display = url ? "block" : "none";
}

// ACTUALIZAR CONTENIDO, IMÁGENES Y AUDIOS

function actualizarContenido() {
  if (!datos || !Array.isArray(datos)) return;

  let ahora = new Date();
  let horaActual = ahora.getHours() * 60 + ahora.getMinutes();

  // Buscar la franja horaria correspondiente
  let franja = datos.find(function (item) {
    let inicio = convertirAMinutos(item.hora_inicio);
    let fin = convertirAMinutos(item.hora_fin);

    if (inicio < fin) {
      return horaActual >= inicio && horaActual < fin;
    }

    // Franja que cruza la medianoche
    return horaActual >= inicio || horaActual < fin;
  });

  if (!franja) return;

  // Obtener los contenedores y actualizar las cuatro ventanas
  for (let i = 1; i <= 4; i++) {
    let texto = document.getElementById("texto-ventana" + i);
    let contenedor = document.getElementById(
      "informacion-ventana" + i
    );

    if (!texto || !contenedor) continue;

    // Asignar el texto
    texto.textContent = franja["ventana_" + i] || "";

    // Obtener y mostrar la imagen correspondiente
    let urlImagen = franja["imagen_ventana_" + i] || "";

    actualizarImagen(
      contenedor,
      urlImagen,
      franja["ventana_" + i] || ""
    );

    // Actualizar el audio
    let audio = window["audioVentana" + i];
    let urlAudio = franja["audio_ventana_" + i] || "";

    if (audio && audio.src !== new URL(urlAudio || "", document.baseURI).href) {
      audio.pause();
      audio.src = urlAudio;
      audio.load();
    }
  }
}

// Convertir "5:00" en 300 minutos
function convertirAMinutos(hora) {
  let partes = hora.split(":");
  return Number(partes[0]) * 60 + Number(partes[1]);
}

// Actualizar las ventanas cada minuto
setInterval(actualizarContenido, 60000);
