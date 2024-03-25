const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// mildware

app.use(cors());
// extended false - does not allow nested objects in query strings
// extended true - allows nested objects in query strings
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());
// endpoints
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// connect to the database

const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://Wistako:${process.env.DB_PASS}@cluster0.80soovx.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0`
  : 'mongodb://localhost:27017/bulletinBoard';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


const server = app.listen(process.env.port || 8000, () => {
  console.log('Server is running on port 8000', process.env.port);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});