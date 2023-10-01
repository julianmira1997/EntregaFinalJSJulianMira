const contenedorTarjetas = document.getElementById("productos-container");
const unidadesE = document.getElementById("unidades");
const precioE = document.getElementById("precio");
const carritoVacioE = document.getElementById("carro-vacio");
const totalesE = document.getElementById("totales");
const reiniciarCarritoE = document.getElementById("reiniciar");
const finalizarCompraE = document.getElementById("comprar");

// Crear tarjetas

function crearTarjetasProductos() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("prendas"));
    if(productos && productos.length > 0){
        productos.forEach((producto) => {
            const nuevaPrenda = document.createElement("div");
            nuevaPrenda.classList = "tarjeta-producto";
            nuevaPrenda.innerHTML = `
                <img src="./img/${producto.id}.jpg">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <div>
                <button>-</button>
                <span class="cantidad">${producto.cantidad} </span>
                <button>+</button>
                </div>
                
            `
    
            contenedorTarjetas.appendChild(nuevaPrenda);
            nuevaPrenda
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                    cuentaElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();
                });
            
            nuevaPrenda
                .getElementsByTagName("button")[0]
                .addEventListener("click",(e)=> {
                    restarAlCarrito(producto);
                    crearTarjetasProductos();
                    actualizarTotales();
                    actualizarNumeroCarrito();
            });
        });
    }
}

crearTarjetasProductos();
actualizarTotales();

// Agregar y restar al carrito

function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("prendas"));
    let cuenta = 0;
    if (!memoria) {
        const nuevoProducto = nuevaMemoria(producto);
        localStorage.setItem("prendas", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else{
        const indiceProducto = memoria.findIndex(bicicleta => bicicleta.id === producto.id);
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(nuevaMemoria(producto));
            cuenta = 1;
        } else{
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("prendas", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("prendas"));
    const indiceProducto = memoria.findIndex(prenda => prenda.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
        localStorage.setItem("prendas", JSON.stringify(memoria));
    } else{
        memoria[indiceProducto].cantidad -- ;
        localStorage.setItem("prendas", JSON.stringify(memoria));
        actualizarNumeroCarrito();
    }

    actualizarTotales();
    revisarCarroVacio();

}

// Actualizar total

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("prendas"));
    let unidades = 0;
    let precio = 0;

    if(productos && productos.length>0){
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesE.innerText = unidades;
        precioE.innerText = precio;
    }
}

actualizarTotales();

// Mensaje de carro vacio si no hay productos

function revisarCarroVacio(){
    const productos = JSON.parse(localStorage.getItem("prendas"));
    carritoVacioE.classList.toggle("escondido",productos && productos.length>0);
    totalesE.classList.toggle("escondido",!(productos && productos.length>0));
}

revisarCarroVacio();



function nuevaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto; 
}

const cuentaCarritoE = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("prendas"));
    if(memoria && memoria.length >0){
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0 )
        cuentaCarritoE.innerText = cuenta;
    }else{
        cuentaCarritoE.innerText = 0;
    }
}

actualizarNumeroCarrito();

// reiniciar carrito

reiniciarCarritoE.addEventListener("click",reiniciarCarrito)
function reiniciarCarrito(){
    localStorage.removeItem("prendas");
    actualizarTotales();
    crearTarjetasProductos();
    revisarCarroVacio();
    actualizarNumeroCarrito();
}

// Finalizar compra

finalizarCompraE.addEventListener("click", finalizarCompra)
function finalizarCompra(){
    localStorage.removeItem("prendas");
    actualizarTotales();
    crearTarjetasProductos();
    revisarCarroVacio();
    actualizarNumeroCarrito();

    swal('! COMPRA EXITOSA ¡','Gracias por tu compra','success')
}

