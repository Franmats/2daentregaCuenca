import mongoose from "mongoose";

const productModel = mongoose.model("products", new mongoose.Schema({
    nombre: {type:String, required:true},
    nombreTag:{type:String, required:true},
    idCategoria:{type:String, required:true},
    descripcion:{type:String, required:true},
    imagen:{type:String, required:true},
    precio:Number,
    stock:Number
}))



export default productModel