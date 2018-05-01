let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let app = express();

// Conexion a BD
mongoose.connect('mongodb://localhost/apirest');

//Model product
let Product = require('./models/product');

//home
app.get('/', (req, res) => {

    Product.find({}, (err, product) => {

        if(err){
            
            console.log(err);

        } else {

            res.sendFile(path.join(__dirname+'/views/home.html'));

        }
    })
});

//Call routes
let product = require('./routes/products');
app.use('/product', product);

app.listen(8080, (req, res) => {
    console.log('Server Running on port 8080');
});