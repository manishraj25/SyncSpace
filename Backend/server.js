import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/authRoutes.js';


dotenv.config();

const app = express();
app.use(cookieParser());


connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});