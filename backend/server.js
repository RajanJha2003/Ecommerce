import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import "dotenv/config";
import userRouter from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
const app=express();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
