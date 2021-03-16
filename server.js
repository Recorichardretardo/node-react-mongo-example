const express = require('express');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const { getArgs } = require('./utils');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// bodyParser.json
app.use(express.json({ extended: false }));

// Set static folder
//app.use(express.static('client/build'));
app.use('/client', express.static(__dirname + '/client/build'));

// Define Routes
// http://localhost:8080/api/users/test
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// app.get('/', (req,res) => res.send('API Running'));

// Serve static assets 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

let args = getArgs(process.argv);

const PORT = process.env.PORT || args.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));