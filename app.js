const express = require("express");
const cors = require("cors");
const recordRoutes = require("./routes/recordRoutes");
const app = express();
  
app.use(express.json());
app.use(cors());

app.options("*", cors());


app.get('/', (req, res) => {
  res.redirect('/api/health');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is healthy' });
});

app.use('/api/records', recordRoutes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl,
  });
});

module.exports = app;
