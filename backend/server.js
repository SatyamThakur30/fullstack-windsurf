const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', require('./routes/auth'));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://innoeve4:o0jyHNaYv7Oq2VJI@cluster0.1am1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
