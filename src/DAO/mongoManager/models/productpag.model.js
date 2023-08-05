import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const productsSchema = new mongoose.Schema({
    nombre:{
        type:String,
        index:true
    },
    nombreTag:{type:String, required:true},
    idCategoria:{type:String, required:true},
    descripcion:{type:String, required:true},
    imagen:{type:String, required:true},
    precio:Number,
    stock:Number
})

productsSchema.plugin(mongoosePaginate)

export default mongoose.model("products", productsSchema) 