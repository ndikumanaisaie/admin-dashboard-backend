import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoute from './server/routes/user.js';
// import postRoute from './routes/posts.js';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/users', userRoute);
// app.use('/posts', postRoute);
app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const MONGODB_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 9000;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
