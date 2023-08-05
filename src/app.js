import express from "express"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import mongoose from "mongoose"
import routerViews from "./routes/views.router.js"
import routerProducts from "./routes/products.route.js"
import routerCart from "./routes/cart.router.js"
import { ProductManager } from "./DAO/fileManager/ProductManager.js"
import __dirname from "./utils.js"

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const conected =() => {
    //Conexion de sockets 
    io.on("connection", socket => {
        socket.on("new-product", async product => {//io para que se actualice en todas las pantallas o cokets, en cambio con socket solo actualizara el user q este conectado
            const manager = new ProductManager()
            await manager.addProduct(product)  
            
            const products1= await manager.getProducts()
            socket.emit("recargar-tabla", products1)
        })

        socket.on("eliminar-producto", async id2 => {
            const manager = new ProductManager()
            console.log(id2);
            await manager.deleteProduct(id2)

            const products1= await manager.getProducts()
            socket.emit("recargar-tabla", products1)
        })

})
}


//MONGODB
const uri = "mongodb+srv://franmats:Casdf670120@cluster0.hi4ljaw.mongodb.net/"
mongoose.set("strictQuery",false)
mongoose.connect(uri, {dbName:"ecommerce"})
    .then(() => console.log("db connected"))
    .then(() => app.listen(8080, ()=> console.log("Listenning")) )


//sockets y Http
/* const httpServer = app.listen(8080, () => console.log("Listening....."))
const io = new Server(httpServer) */
//Multer
app.use("/static",express.static(__dirname + "/public"))
//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")




//Rutas
app.use("/",routerViews)
app.use("/api/products",routerProducts)
app.use("/api/carts",routerCart)


