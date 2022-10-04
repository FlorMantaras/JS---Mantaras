class Evento {
    constructor(artista, lugar, fecha, precio,img,id) {
        this.artista = artista;
        this.lugar = lugar;
        this.fecha = fecha;
        this.precio = precio;
        this.img = img;
        this.id=id;
    }
}

const eventos = [
    new Evento ("Canticuenticos", "Casa España", "12/10/2022", 1500, './assets/img/canticuenticos.jpg',"1"),
    new Evento ("Topa", "Anfiteatro", "03/10/2022", 2300, "./assets/img/topa.jpg","2"),
    new Evento ("Luli Pampin", "Casa España", "07/10/2022", 2800,"./assets/img/luli.jpg","3"),
]

const eventosNoviembre22 = [
    new Evento ("Tiempo de Sol", "Casa España", "12/11/2022", 3200, './assets/img/tiempodesol.jpg',"4")
]

const todosEventos = [...eventos,...eventosNoviembre22];

console.log(todosEventos)

let carrito = [];
let opcion;

function calcularTotal (){

    let total = 0;
    
    carrito.forEach((ev)=>{
        total += ev.precio * ev.cantidad;
    })
    
    const t = document.getElementById('total');
    
    t.innerHTML = `<h5> Total a pagar $ ${total}`
}


function agregarShowAlCarrito(id){
    let t = todosEventos.find (t => t.id ===id );
    let showEnCarrito = carrito.find(t => t.id ===id);
    showEnCarrito ? showEnCarrito.cantidad ++ : (t.cantidad = 1, carrito.push(t))
    renderizarCarrito();
    calcularTotal ();
    saveCarritoStorage (carrito);
}

function eliminarProductoDelCarrito(index){

    carrito[index].cantidad--;
    
    if(carrito[index].cantidad === 0){
        carrito.splice(index,1);
    }

    renderizarCarrito();
    calcularTotal ();
    saveCarritoStorage (carrito);
}

function renderizarCarrito(){
    let modCarrito = document.querySelector('#carrito');
    
    modCarrito.innerHTML = '';

    carrito.forEach((ev,index)=>{
        let card = document.createElement('div');
        card.classList.add('col-12');  
        card.classList.add('col-md-4');
        card.classList.add('mb-5');
        card.classList.add('d-flex');
        card.classList.add('justify-content-center');
        
        const {img, artista, fecha, id, lugar, precio, cantidad} = ev
    
        card.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="card img">
            <div class="card-body">
                <h5 class="card-title">${artista}</h5>
                <p class="card-text">Seleccionaste tu entrada para el show de ${artista} el día ${fecha} en ${lugar}. <br> El valor de cada entrada es $ ${precio}.-</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="btn btn-primary"id="${id}">ELIMINAR</button>
            </div>
         </div>
         `
         
        card.querySelector('button').addEventListener('click', () => {
        
            eliminarProductoDelCarrito (index)
        })
        
        modCarrito.appendChild(card);
    })
}

function renderizarCard ()  {
    
    const tarj = document.getElementById(`tarjetasTienda`);
    
    todosEventos.forEach((ev) => {
        let card = document.createElement(`div`);
        card.classList.add('col-12');  
        card.classList.add('col-md-4');
        card.classList.add('mb-5');
        card.classList.add('d-flex');
        card.classList.add('justify-content-center');
        
        const {img, artista, fecha, id, lugar, precio} = ev
    
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${artista}</h5>
          <p class="card-text">Comprá tu entrada para el show de ${artista} el día ${fecha} en ${lugar}. <br> El valor de la entrada es $ ${precio}.-</p>
         <button class="btn btn-primary"id="${id}">COMPRAR</button>
        </div>
      </div>`
    
        tarj.appendChild(card);
        
        card.querySelector('button').addEventListener('click', () =>{
        agregarShowAlCarrito(ev.id)
        });
    }
)}

const saveCarritoStorage = (carrito) => {
    localStorage.setItem('carrito',JSON.stringify(carrito));
};

const getCarritoStorage = (carrito) => {
    const CarritoStorage =JSON.parse(localStorage.getItem('carrito'));
    return CarritoStorage || [];
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = getCarritoStorage();
        renderizarCarrito(carrito);
    }
});

renderizarCard()
