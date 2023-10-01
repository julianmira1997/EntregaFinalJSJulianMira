const prendas = [
    { id: 1, nombre: "Camiseta basica", img: "./img/1.jpg", precio: 6000 },
    { id: 2, nombre: "camisa tipo polo", img: "./img/2.jpg", precio: 13000 },
    { id: 3, nombre: "Sudadera", img: "./img/3.jpg", precio: 9000 },
    { id: 4, nombre: "jean", img: "./img/4.jpg", precio: 12000 },
    { id: 5, nombre: "Chaqueta", img: "./img/5.jpg", precio: 17000 },
    { id: 6, nombre: "tenis", img: "./img/6.jpg", precio: 22000 },
    { id: 7, nombre: "zapatos", img: "./img/7.jpg", precio: 26000 },
    { id: 8, nombre: "Calcetines", img: "./img/8.jpg", precio: 2000 },
    { id: 9, nombre: "Gorra", img: "./img/9.jpg", precio: 7000 },
];

//Crear tarjetas para los productos

const mostrarProductosEnDom = () => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(prendas);
    }, 1000);
    });
};

let aparecenProductos = [];

const renderProductos = (arr) => {
    const contenedorTarjetas = document.getElementById("productos-container");
    function crearTarjetasProductosInicio(productos) {
    productos.forEach((producto) => {
        const nuevaPrenda = document.createElement("div");
        nuevaPrenda.classList = "tarjeta-producto";
        nuevaPrenda.innerHTML = `
            <img src="./img/${producto.id}.jpg">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        contenedorTarjetas.appendChild(nuevaPrenda);
        nuevaPrenda
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => agregarAlCarrito(producto));
    });
    }
    crearTarjetasProductosInicio(prendas);
};

mostrarProductosEnDom()
    .then((res) => {
        productos = res
        renderProductos(productos)
    })

// Agregar producto al carrito

function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("prendas"));
    if (!memoria) {
    const nuevoProducto = productoParaMemoria(producto);
    localStorage.setItem("prendas", JSON.stringify([nuevoProducto]));
    } else {
    const indiceProducto = memoria.findIndex(
        (prendas) => prendas.id === producto.id
    );
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
        nuevaMemoria.push(productoParaMemoria(producto));
    } else {
        nuevaMemoria[indiceProducto].cantidad++;
    }
    localStorage.setItem("prendas", JSON.stringify(nuevaMemoria));

    swal("! AGREGADO AL CARRITO ¡", "", "success");
    }
    actualizarNumeroCarrito();
}

// Numero de productos en el carrito

const cuentaCarritoE = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("prendas"));
    if (memoria && memoria.length > 0) {
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad,0);
    cuentaCarritoE.innerText = cuenta;
    } else {
    cuentaCarritoE.innerText = 0;
    }
}
actualizarNumeroCarrito();

// Agregar producto a la memoria

function productoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}
