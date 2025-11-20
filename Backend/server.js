import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();

const app = express();


connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});