let mongoose = require('mongoose');

module.exports = Producto = mongoose.model('Product', productSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    cant: {
        type: Number,
        required: true
    }

}));