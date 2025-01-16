import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './src/routes/todo.routes.js';

dotenv.config();
const port = 5900;
const app = express();

const corsOption = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
}

app.use(cors(corsOption));

//-------------- Connecting to the database -------------------
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log(`MongoDB Database is connected:::`)
    })
    .catch((err) => {
        console.log(`Error connecting to the database:: ${err}`);
    })



//---------------------------------------- Routes -----------------------------------------
app.use('/todo-api', todoRoutes);



//------------------------------------------- Running the Backend Server-----------------------------
app.listen(port, () => {
    console.log(`Backend server is up and running on PORT: ${port}`);

});