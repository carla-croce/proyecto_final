let contenedor = document.getElementById("contenedor");

const planes = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  const carrito = [];

  function añadirAlCarrito(precio) {
    let productoEncontrado = data.find(plan => plan.precio === parseInt(precio));
    carrito.push(productoEncontrado);
    document.getElementById('precio-total').textContent = `$${calcularTotal(carrito)}`;
  }

  function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    return total;
  }

  data.forEach((plan) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div>
        <div class="card">
            <div class="card-body">
            <h3 class="card-title">Plan de entrenamiento ${plan.plan}</h3>
            <p class="card-text">Duración: ${plan.duracion}</p>
            <p class="card-text"><b>Precio: $${plan.precio}</b></p>
            <button class="btn bg-violet text" id="boton${plan.precio}">Agregar</button>
            <button class="btn bg-violet text" id="btn${plan.precio}">Quitar</button>
            </div>
        </div>
    </div>
    `;

    contenedor.append(div);

    let boton = document.getElementById(`boton${plan.precio}`);
    boton.addEventListener("click", (e) => {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: `'Ha seleccionado plan de entrenamiento ${plan.plan}. Valor: $${plan.precio}'`,
        showConfirmButton: true,
        timer: 10000
      });

      añadirAlCarrito(e.target.id.replace('boton', ''));
    });

    let btn = document.getElementById(`btn${plan.precio}`);
    btn.addEventListener("click", (e) => {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: `'Ha seleccionado el botón 'Quitar''`,
        showConfirmButton: true,
        timer: 10000
      });

      eliminarDelCarrito(carrito, e.target.id.replace('btn', ''));
    });
  });

  function eliminarDelCarrito(carrito, precio) {
    let productoEncontrado = carrito.find(plan => plan.precio === parseInt(precio));
    let index = carrito.indexOf(productoEncontrado);
    if (index > -1) {
      carrito.splice(index, 1);
      document.getElementById('precio-total').textContent = `$${calcularTotal(carrito)}`;
    }
  }

  
    // agrego el segundo arreglo y lo recorro
    data.forEach((plan) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div>
            <div class="card">
            <div class="card-body">
                <h3 class="card-title">Plan alimenticio ${plan.plan}</h3>
                <p class="card-text">Duración: ${plan.duracion}</p>
                <p class="card-text"><b>Precio: $${plan.precio}</b></p>
                <button class="btn bg-violet text" id="agregar${plan.precio}">Agregar</button>
                <button class="btn bg-violet text" id="quitar${plan.precio}">Quitar</button>
            </div>
            </div>
        </div>
      `;
       
        contenedor.append(div);

        let agregar = document.getElementById(`agregar${plan.precio}`);
        agregar.addEventListener("click", (e) => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `'Ha seleccionado plan alimenticio ${plan.plan}. Valor: $${plan.precio}'`,
            showConfirmButton: true,
            timer: 10000
          });
    
          añadirAlCarrito(e.target.id.replace('agregar', ''));
        });
    
        let quitar = document.getElementById(`quitar${plan.precio}`);
        quitar.addEventListener("click", (e) => {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `'Ha seleccionado el botón 'Quitar''`,
            showConfirmButton: true,
            timer: 10000
          });
    
          eliminarDelCarrito(carrito, e.target.id.replace('quitar', ''));
        });
      });
    
      function eliminarDelCarrito(carrito, precio) {
        let productoEncontrado = carrito.find(plan => plan.precio === parseInt(precio));
        let index = carrito.indexOf(productoEncontrado);
        if (index > -1) {
          carrito.splice(index, 1);
          document.getElementById('precio-total').textContent = `$${calcularTotal(carrito)}`;
        }
      }
    

}

planes();