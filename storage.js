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
