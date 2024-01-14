$(document).ready(function () {
  cargarYMostrarGuitarras('guitarras.json', '#guitarras');


  $('.marca-option').on('click', function (e) {
    e.preventDefault();
    var marcaSeleccionada = $(this).data('marca');
    filtrarGuitarrasPorMarca(marcaSeleccionada);
  });
});

function cargarYMostrarGuitarras(archivoJSON, contenedorID) {
  $.ajax({
    url: 'js/' + archivoJSON,
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      mostrarGuitarras(json.guitarras, contenedorID);
    },
    error: function (xhr, status) {
      console.log(`Disculpe, existió un problema al cargar ${archivoJSON}`);
    },
    complete: function (xhr, status) {
      console.log(`Petición realizada para ${archivoJSON}`);
    },
  });
}

function mostrarGuitarras(guitarras, contenedorID) {
  var contenedor = $(contenedorID);
  contenedor.empty(); // Limpiar el contenedor antes de mostrar las guitarras

  // Obtener la marca seleccionada (si hay alguna)
  var marcaSeleccionada = $('.marca').text().trim();

  // Filtrar las guitarras por marca si hay una marca seleccionada
  if (marcaSeleccionada !== 'Marcas') {
    guitarras = guitarras.filter(function (guitarra) {
      return guitarra.marca.toUpperCase() === marcaSeleccionada.toUpperCase();
    });
  }

  // Dividir las guitarras en grupos de 3
  var gruposDeTres = chunkArray(guitarras, 3);

  $.each(gruposDeTres, function (index, grupo) {
    var row = $('<div class="row"></div>');
    contenedor.append(row);

    $.each(grupo, function (index, guitarra) {
      var cardHtml = `
        <div class="col-12 col-md-4 mb-4">
          <div class="card">
            <img src="${guitarra.imagen}" class="card-img-top" alt="${guitarra.nombre}">
            <div class="card-body">
              <h5 class="card-title">${guitarra.marca} ${guitarra.nombre}</h5>
              <p class="card-text">${guitarra.descripcion}</p>
              <p class="card-text">Precio: $${guitarra.precio.toFixed(2)}</p>
              <p class="card-text">Tipo: ${guitarra.tipo}</p>
            </div>
          </div>
        </div>
      `;

      row.append(cardHtml);
    });
  });
}

// Función para dividir un array en grupos de un tamaño específico
function chunkArray(arr, chunkSize) {
  var groups = [];
  for (var i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}

// Función para filtrar las guitarras por marca
function filtrarGuitarrasPorMarca(marca) {
  $('.marca').text(marca); // Actualizar el texto del botón de marcas
  cargarYMostrarGuitarras('guitarras.json', '#guitarras'); // Recargar y mostrar las guitarras
}


