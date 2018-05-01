let express = require('express');
let path = require('path');
let queryString = require('querystring');
let router = express.Router();

let Product = require('../models/product');

// Soporte de memoria
var data_post_maximo = 8 * 1024 * 1024;

//Mostrar formulario
router.get('/add', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/addproduct.html'));

});

//Recibir informacion del form de productos
router.post('/add', (req, res) => {
    
    let datos = '';

    req.on('data', (data_cortada) => {

        datos += data_cortada;

        if(datos.length > data_post_maximo){

            this.pause();

            res.json(
                {

                    message: "Ha surgido un error"

                }
            );

        }
    });

    req.on('end', () => {

        let objetoDatos = queryString.parse(datos);

        let product = new Product();

        product.name = objetoDatos.name;
        product.cant = objetoDatos.cant;

        //Promises
        let prom = require('./promises');

        prom.addProduct(product.cant).then((resultado) => {

            product.save((err) => {

                if(err){
    
                    console.log(err);
                    return;
    
                } else {
    
                    res.status(200).json(
                        {

                            message: "Product Added"

                        }
                    );
                }
            });
            
        }, (error) => {

            res.json(
                {

                    message: error

                }
            );

        });
    });
});

//List Product
router.get('/list', (req, res) => {
    
    Product.find({}, (err, product) => {
        
        if(err){

            console.log(err);

        } else {

            res.status(200).json(
                {
                    products: product
                }
            );

        }
    });
});

//Read for _id
router.get('/:id', (req, res) => {

    Product.findById(req.params.id, (err, product) => {

        if(err){

            console.log(err);
            return;

        } else {

            res.status(200).json(
                {

                    name: product.name,
                    cantidad: product.cant

                }
            )

        }

    });
});

// Update product
router.put('/edit/:id', (req, res) => {

    res.status(200).json(
        {

            message: "Updated Product"

        }
    );
});

// Delete product
router.delete('/del/:id', (req, res) => {

    res.status(200).json(
        {

            message: "Deleted Product"

        }
    );
});

module.exports = router;