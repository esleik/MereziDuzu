$(document).ready(function () {
    cargarYMostrarInstrumentos('trompetas.json', '#trompetas');
  
    // Agregar evento de cambio al menú de marcas
    $('.marca-option').on('click', function (e) {
      e.preventDefault();
      var marcaSeleccionada = $(this).data('marca');
      filtrarInstrumentosPorMarca(marcaSeleccionada, '#trompetas');
    });
  });
  
  function cargarYMostrarInstrumentos(archivoJSON, contenedorID) {
    $.ajax({
      url: 'js/' + archivoJSON,
      type: 'GET',
      dataType: 'json',
      success: function (json) {
        mostrarInstrumentos(json.trompetas, contenedorID);
      },
      error: function (xhr, status) {
        console.log(`Disculpe, existió un problema al cargar ${archivoJSON}`);
      },
      complete: function (xhr, status) {
        console.log(`Petición realizada para ${archivoJSON}`);
      },
    });
  }
  
  function mostrarInstrumentos(instrumentos, contenedorID) {
    var contenedor = $(contenedorID);
    contenedor.empty(); // Limpiar el contenedor antes de mostrar los instrumentos
  
    // Obtener la marca seleccionada (si hay alguna)
    var marcaSeleccionada = $('.marca').text().trim();
  
    // Filtrar los instrumentos por marca si hay una marca seleccionada
    if (marcaSeleccionada !== 'Marcas') {
      instrumentos = instrumentos.filter(function (instrumento) {
        return instrumento.marca.toUpperCase() === marcaSeleccionada.toUpperCase();
      });
    }
  
    // Dividir los instrumentos en grupos de 3
    var gruposDeTres = chunkArray(instrumentos, 3);
  
    $.each(gruposDeTres, function (index, grupo) {
      var row = $('<div class="row"></div>');
      contenedor.append(row);
  
      $.each(grupo, function (index, instrumento) {
        var cardHtml = `
          <div class="col-12 col-md-4 mb-4">
            <div class="card">
              <img src="${instrumento.imagen}" class="card-img-top" alt="${instrumento.nombre}">
              <div class="card-body">
                <h5 class="card-title">${instrumento.marca} ${instrumento.nombre}</h5>
                <p class="card-text">${instrumento.descripcion}</p>
                <p class="card-text">Precio: $${instrumento.precio.toFixed(2)}</p>
              </div>
            </div>
          </div>
        `;
  
        row.append(cardHtml);
      });
    });
  }
  
  // Función para filtrar los instrumentos por marca
  function filtrarInstrumentosPorMarca(marca, contenedorID) {
    $('.marca').text(marca); // Actualizar el texto del botón de marcas
    cargarYMostrarInstrumentos('trompetas.json', contenedorID); // Recargar y mostrar los instrumentos
  }
  
  // Función para dividir un array en grupos de un tamaño específico
  function chunkArray(arr, chunkSize) {
    var groups = [];
    for (var i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }
  