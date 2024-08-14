const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:3,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    categpry:{
        type:String,
        require:true,
        enum:['Electronics', 'Clothing', 'Books', 'Beauty' ,'Fashion', 'home and Kitchen' ,'Grocery'],
        default:'Electronics'
    },
    imgURL:{
        type:String,
        require:true,
    },
    stockQuantity:{
        type:Number,
        require:true,
        min:1
    },
    ratings:{
        type:Number,
        default:0
    }
})

const productsModel = mongoose.model('Products',productSchema)

module.exports = productsModel;