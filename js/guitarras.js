$(document).ready(function () {
  cargarYMostrarGuitarras('guitarras.json', '#guitarras');
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


  var cardContainer = $('<div class="card-container"></div>');
  contenedor.append(cardContainer);

  $.each(guitarras, function (index, guitarra) {
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

    cardContainer.append(cardHtml);
  });
}

