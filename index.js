import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import itemsRouter from "./routes/itemRouter.js";
import mediaRouter from "./routes/mediaRouter.js";


const DB_URL = 'mongodb://127.0.0.1:27017/dieselMarket';
const LISTEN_PORT = 5000;

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for form data
app.use(cors());
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/items',itemsRouter)
app.use('/media',mediaRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL,{useUnifiedTopology: true, useNewUrlParser: true},(e)=>console.log(e))
        app.listen(LISTEN_PORT, () => console.log('SERVER STARTED ON PORT ' + LISTEN_PORT))

    } catch (e) {
        console.log(e)
    }
}


startApp()