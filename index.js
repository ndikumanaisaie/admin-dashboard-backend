import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from "helmet";

import clientRoutes from './server/routes/client.js';
import generalRoutes from './server/routes/general.js';
import managementRoutes from './server/routes/management.js';
import salesRoutes from './server/routes/sales.js';

/* CONFIGURATION */
const app = express();
dotenv.config();

app.use(morgan('common'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const MONGODB_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 9000;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
