import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import *as dotenv from 'dotenv'
import todoRouter from './routes/todoRoute.js'
import userRouter from './routes/userRoute.js'
import errorHandler from './middleware/errorHandler.js'
import notFoundHandler from './middleware/notFoundHandler.js'

dotenv.config()

const app = express();
const _uri = process.env.MONGODB_URI ||  'mongodb://localhost:27017/todoApp';
const PORT =process.env.PORT || 4001
mongoose.connect(_uri).then(()=>console.log('Mit MongoDB verbunden.')).catch((err)=> console.log('Verbinden mit MongoDB fehlgeschlagen.', err))
mongoose.connection.on('error', console.log);
mongoose.set('strictQuery', true)

app.use(express.json());
app.use(
        cors({
          origin: "*",
          methods: 'GET,POST,DELETE,PATCH',
          credentials: true,
        })
      );
app.use(morgan('dev'));
app.use(errorHandler);
//app.use(notFoundHandler);

app.use('/todos',todoRouter)
app.use('/users',userRouter)


app.listen(PORT , ()=>{
        console.log(`Server läuft http://localhost:${PORT}`);
})