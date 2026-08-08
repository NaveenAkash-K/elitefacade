require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const startKeepAlive = require('./utils/keepAlive');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/fabrication', require('./routes/fabrication'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startKeepAlive();
});
