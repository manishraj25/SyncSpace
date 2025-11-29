import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { initSocket } from './socket.js';

import authRouter from './routes/authRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import chatRoomRouter from './routes/chatRoomRoutes.js';
import workspaceRouter from './routes/workspaceRoutes.js';
import documentRouter from './routes/documentRoutes.js';
import fileRouter from './routes/fileRoutes.js';
import userRouter from './routes/userRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import kanbanRouter from './routes/kanbanRoutes.js';


dotenv.config();

const app = express();


connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const server = http.createServer(app);

export const io = initSocket(server);

// Attach io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/chatroom', chatRoomRouter);
app.use('/api/workspaces', workspaceRouter);
app.use('/api/documents', documentRouter);
app.use('/api/files', fileRouter);
app.use('/api/users', userRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/comments', commentRouter);
app.use('/api/kanban', kanbanRouter);


const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});