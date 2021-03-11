const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// bodyParser.json

app.use(express.json({ extended: false }));

// Define Routes
// http://localhost:8080/api/users/test
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.get('/', (req,res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));