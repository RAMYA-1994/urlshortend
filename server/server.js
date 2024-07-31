
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/urls');




// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.dbUrl;

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect("mongodb+srv://user1:ramyapraba@cluster0.bnxxvoh.mongodb.net/?retryWrites=true&w=majority&appName=urlshortend" )
  .then(() => {
    console.log('Database Connected...');
  })
  .catch((error) => {
    console.error('NOT CONNECTED! Error:', error.message);
  });

// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
