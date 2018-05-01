let addProduct = (cantidad) => {

    return new Promise((res, rej) => {

        if(cantidad < 1 || cantidad > 1000){
            
            rej('La cantidad del producto no esta en el rango permitido');

        } else {

            res('Se ha agregado un nuevo producto');

        }
    });
}

module.exports = {

    addProduct
}