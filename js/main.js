$(document).ready(function () {
  cargarYMostrarProductosDestacados('guitarras.json', '#productosDestacados');
  cargarYMostrarProductosDestacados('pianos.json', '#productosDestacados');
  cargarYMostrarProductosDestacados('percusion.json', '#productosDestacados');
  cargarYMostrarProductosDestacados('saxos.json', '#productosDestacados');
  cargarYMostrarProductosDestacados('trompetas.json', '#productosDestacados');
  cargarYMostrarProductosDestacados('flautas.json', '#productosDestacados');
});

function cargarYMostrarProductosDestacados(archivoJSON, contenedorID) {
  $.ajax({
    url: 'js/' + archivoJSON,
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      mostrarProductosDestacados(json[archivoJSON.split('.')[0]], contenedorID);
    },
    error: function (xhr, status) {
      console.log(`Disculpe, existió un problema al cargar ${archivoJSON}`);
    },
    complete: function (xhr, status) {
      console.log(`Petición realizada para ${archivoJSON}`);
    },
  });
}

function mostrarProductosDestacados(productos, contenedorID) {
  var contenedor = $(contenedorID);

  // Crear un único div row para contener todas las tarjetas
  var row = contenedor.find('.row');

  if (row.length === 0) {
    row = $('<div class="row justify-content-center"></div>'); // Añadido 'justify-content-center'
    contenedor.append(row);
  }

  // Filtrar solo los productos que son "lo más vendido"
  var destacados = productos.filter(function (producto) {
    return producto.loMasVendido === true;
  });

  // Ordenar por id
  destacados.sort(function (a, b) {
    return a.id - b.id;
  });

  // Iterar sobre los productos destacados y construir el HTML
  destacados.forEach(function (producto, index) {
    var nuevoProducto = $(`
          <div class="col-12 col-md-4 mb-4">
              <div class="card producto mx-auto"> <!-- Agregado 'mx-auto' -->
                  <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                  <div class="card-body text-center"> <!-- Agregado 'text-center' -->
                      <h5 class="card-title">${producto.marca} - ${producto.nombre}</h5>
                      <p class="card-text">${producto.descripcion}</p>
                      <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                      <a href="#" class="btn btn-primary">Ver detalles</a>
                  </div>
              </div>
          </div>
      `);

    // Agrega el producto a la fila actual
    row.append(nuevoProducto);
  });
}








