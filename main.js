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

let carrito = [];
let opcion;


function show (selecShow){
    alert (`Seleccionaste ${eventos [selecShow-1].artista} en ${eventos [selecShow-1].lugar} el día ${eventos [selecShow-1].fecha}, el precio de la entrada es $ ${eventos [selecShow-1].precio}`)
    eventos[selecShow-1].entradas = Number (prompt (`¿Cuántas entradas desea comprar?`))
    carrito.push(eventos[selecShow-1]);
    console.log(carrito)
}

function pagar () {
    let totalPagar = carrito.reduce((acc, al) => acc + al.precio * al.entradas,0);
    alert (`Seleccionaste pagar entradas, vas a pagar: ${totalPagar} `);
} 

function agregarShowAlCarrito(id){
    let t =eventos.find (t => t.id ===id );
    let showEnCarrito = carrito.find(t => t.id ===id);
    if (showEnCarrito){
        showEnCarrito.cantidad ++;
        console.log(carrito)
    }else{
        t.cantidad=1;
        carrito.push(t);
        console.log(carrito)
    }
    // renderizarCarrito();
}

// function renderizarCarrito(){
//     let modCarrito = document.querySelector('#carrito')
    
//     modCarrito.innerHTML = '';

//     carrito.forEach((ev,id)=>{
//         let card = document.createElement(`div`);
//         card.classList.add('col-12');  
//         card.classList.add('col-md-4');
//         card.classList.add('mb-5');
//         card.classList.add('d-flex');
//         card.classList.add('justify-content-center');
    
//         card.innerHTML = `
//         <div class="card" style="width: 18rem;">
//         <img src="${ev.img}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${ev.artista}</h5>
//           <p class="card-text">Comprá tu entrada para el show de ${ev.artista} el día ${ev.fecha} en ${ev.lugar}. <br> El valor de la entrada es $ ${ev.precio}.-</p>
//          <button class="btn btn-primary"id="${ev.id}">ELIMINAR</button>
//         </div>
//       </div>`
            
//        modCarrito.appendChild(card); 
       
       
//     })
// }

// do{
//     opcion = Number(prompt('Elije la opcion deseada: \n1 - Comprar entradas show  \n2 - Pagar entradas seleccionadas \n3 - Salir'));
//         if (opcion == 1){
            
//             let showSeleccionado = Number (prompt ("Seleccione a qué show desea asistir:\n1 -Canticuenticos, \n2 - Topa. \n3 - Luli Pampin"))
            
//                 if (showSeleccionado == 1 || showSeleccionado == 2 || showSeleccionado == 3){
//                     show(showSeleccionado)
//                 }else{
//                     alert("La opcion seleccionada no existe");
//                 }
  
//         }else if (opcion == 2){
//             pagar(); 
          
//         }else if(opcion == 3){ 
//             alert (`Te esperamos nuevamente, gracias por visitarnos`);

//         }else{
//             alert("La opcion seleccionada no existe");
//         } 
// }while (opcion != 3)

function renderizarCard ()  {
    
    const tarj = document.getElementById(`tarjetasTienda`);
    
    eventos.forEach((ev) => {
        let card = document.createElement(`div`);
        card.classList.add('col-12');  
        card.classList.add('col-md-4');
        card.classList.add('mb-5');
        card.classList.add('d-flex');
        card.classList.add('justify-content-center');
    
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${ev.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ev.artista}</h5>
          <p class="card-text">Comprá tu entrada para el show de ${ev.artista} el día ${ev.fecha} en ${ev.lugar}. <br> El valor de la entrada es $ ${ev.precio}.-</p>
         <button class="btn btn-primary"id="${ev.id}">COMPRAR</button>
        </div>
      </div>`
    
        tarj.appendChild(card);
        
        card.querySelector('button').addEventListener('click', () =>{
        agregarShowAlCarrito(ev.id)
        });
    }
)}

renderizarCard()

