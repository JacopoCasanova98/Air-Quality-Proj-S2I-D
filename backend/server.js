const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Routes');
const cors = require('cors');

dotenv.config();
const app = express();

// Configurazione CORS
app.get('/', (req, res) => {
  res.send('Benvenuti nella mia applicazione!');
});

// Middlewares
app.use(express.json());

// Connessione al database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso al database');
  })
  .catch((error) => {
    console.error('Errore di connessione al database:', error);
  });

// Rotte per l'autenticazione
app.use('/auth', authRoutes);

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

