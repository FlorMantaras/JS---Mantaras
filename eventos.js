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
