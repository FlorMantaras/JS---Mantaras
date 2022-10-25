let carrito = [];

const tot = document.getElementById('total');
const boton = document.getElementById('btnVacCarrito')

function finalizarCompra(){
    
    Swal.fire({
        title: 'Desea finalizar la compra?',
        text: "",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Gracias por la compra!',
            'Lo redireccionamos a la pantalla de pago',
            'success'
          )
          vaciarCarrito();
        }
      })    
}



function calcularTotal (){

    tot.innerHTML = ``

    let total = 0;
    
    carrito.forEach((ev)=>{
        total += ev.precio * ev.cantidad;
    })
      
    tot.innerHTML = `<h5> Total a pagar $ ${total}`
}


function agregarShowAlCarrito(id){
    let event = todosEventos.find (event => event.id ===id );
    let showEnCarrito = carrito.find(event => event.id ===id);
    showEnCarrito ? showEnCarrito.cantidad ++ : (event.cantidad = 1, carrito.push(event))
    renderizarCarrito();
    calcularTotal ();
    saveCarritoStorage (carrito);
    console.log (carrito)
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

function vaciarCarrito (){  
    
    carrito = [];
    renderizarCarrito();
   
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
    
    let btnVaciar = document.getElementById('btnVaciar');

         btnVaciar.innerHTML = `
                        <button class="btn btn-primary"id="btnVacCarrito"> VACIAR CARRITO </button>
                        `
        btnVaciar.querySelector('button').addEventListener('click', () => {
            vaciarCarrito();
    })
        
    let btnFinCpra = document.getElementById ('FinalizarCpra');
        
        btnFinCpra.innerHTML = `
                        <button class="btn btn-primary"id="btnVacCarrito"> FINALIZAR COMPRA </button>
                        `
        btnFinCpra.querySelector('button').addEventListener('click', () => {
        finalizarCompra();
        })
        calcularTotal();   
}

function renderizarCard ()  {
    
    const tarj = document.getElementById(`tarjetasTienda`);
    
    todosEventos.forEach((ev) => {
        let card = document.createElement(`div`);
        card.classList.add('col-12');  
        card.classList.add('col-md-3');
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
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Entrada de ${artista} agregada con éxito`
          })
        
        
        });
    }
)}


async function dolar (){
    const events = document.getElementById('footer');
    
    const response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    
    const data = await response.json()
    console.log(data)
    events.innerHTML = `
                        <p class="tipoDolar"> ${data[1].casa.nombre} </p>
                        <p class="valorDolar"> Compra: ${data[1].casa.compra} -  Venta: ${data [1].casa.venta} </p>
                        `
    }
    
dolar ()
renderizarCard()


