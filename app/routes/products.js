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
            res.end('Ha surgido un error');
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
    
                } else {
    
                    res.send(resultado + "<html> <head> <title> Error </title> </head> <body> <a href='/product/list'> <input type='button' value='OK'> </a>");
    
                }
            });
            
        }, (error) => {

            res.send(error + "<html> <head> <title> Error </title> </head> <body> <a href='/product/add'> <input type='button' value='OK'> </a>");

        });
    });
});

//List Product
router.get('/list', (req, res) => {
    
    Product.find({}, (err, product) => {
        
        if(err){

            console.log(err);

        } else {

            let temp = "<html> <head> <title> Lista </title> </head> <body>";

            let obj = [];

            for(var i=0;i<product.length;i++){

                obj[i] = "<a href='/product/"+ product[i]._id + "'><p>" + product[i].name + "</p>";

                temp += obj[i];

            }

            temp += "</body> </html>";
            res.send(temp);

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

            res.send(product.name + " Cantidad: " + product.cant);

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