import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './src/routes/todo.routes.js';

dotenv.config();
const port = 5990;
const app = express();

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    res.removeHeader('Cross-Origin-Embedder-Policy');
    next();
});


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