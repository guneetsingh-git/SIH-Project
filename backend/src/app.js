const cors = require('cors');
const express = require('express');

const healthRoutes = require('./routes/healthRoutes');
const apiRoutes = require('./routes/apiRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(cors({ origin: origins }));
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/v1', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
