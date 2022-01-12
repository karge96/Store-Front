// conexion al API
const URI_SERVER="http://localhost:3000";

// fuente de imagen opcional en caso de que el producto no la posea
var image = new Image(100, 200);
image.src = 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698978-icon-131-cloud-error-512.png';

function buildTemplate(data){
  let template = ``;
  const categories= data.categories;
  const products = data.products;
  categories.forEach(category => {
    const productsFiltered = products.filter(p => p.categoryId == category.id);
    if (productsFiltered.length>0) {
      let productsTemplate = ``;
      productsFiltered.forEach(product => {

        // condicional en caso de que la imagen este vacio o nula en la BD
        img = '';
        if (product.url_image == ''  || product.url_image == null) {
          img = image.src;
        }else{img= product.url_image}

        // template del producto
        productsTemplate =  `${productsTemplate}
          <div class="producto">
            <div class="img">
              <img src="${img}">
            </div>
            <div class="nombre contenedor">
              <h3>${product.productName}</h3>
            </div>
            <div class="precios">
              <p>Precio: $${product.price}</p>
              <p>Desc:<span> - ${product.discount} %</span></p>
            </div>
          </div>  
        `
      })
      template = `${template}
        <div class="categorias">
          <h2> ${category.name} </h2>
          <div id="listado">
            ${productsTemplate}
          </div>
        </div>
      `;
    } 
  })
  return template;
}

// funcion de la barra de busqueda
function getData(q){
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: `${URI_SERVER}?q=${q}`,
    success: function(data){
      let template = '';
      if(data.products.length < 1){
        template = emptyState();
      }else{
        template = buildTemplate(data);
      }
      document.getElementById("container-list").innerHTML = template;
    },
  });
}
function emptyState(){
  return ` <div class="not-found">
  <h2>Producto no encontrado</h2>
    <a href="./index.html">
      <button>Ir al Inicio</button>
    </a>
  </div>
  `;
}
getData("");