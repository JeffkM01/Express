// app.js
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

// Import your services
const registerLoginCredentials = require('./services/registerService');
const validateLoginCredentials = require('./services/loginService');
const { getAccountDetails, createAccountDetails } = require('./services/accountService');

const app = express();

// Environment-aware port (Render sets process.env.PORT)
const port = process.env.PORT || 8080;

// CORS setup for your Netlify frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Netlify URL or local React dev
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Logger for incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Setup Postgres client using Render environment variables
const dbClient = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

dbClient.connect()
  .then(() => console.log('Connected to Postgres!'))
  .catch(err => {
    console.error('Postgres connection error:', err);
    process.exit(1); // Stop server if DB connection fails
  });

// Attach DB client to req for services
app.use((req, res, next) => {
  req.db = dbClient;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send({ url: req.url, method: req.method });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  validateLoginCredentials(req, res);
});

app.post('/registration', (req, res) => {
  console.log(req.body);
  registerLoginCredentials(req, res);
});

app.get('/account', (req, res) => {
  console.log(req.url);
  getAccountDetails(req, res);
});

app.post('/account', (req, res) => {
  console.log(req.body);
  createAccountDetails(req, res);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



/*const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const registerLoginCredentials = require('./services/registerService');
const validateLoginCredentials = require('./services/loginService');
const { getAccountDetails, createAccountDetails } = require('./services/accountService');


app.use(
    (request, response, next) => {
        console.log("A new request received at " + new Date(Date.now()));
        next();
    }
);

app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: "https://gregarious-belekoy-0aca3e.netlify.app", // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get('/', (req, res) => {
    res.send({url: req.url, method: req.method})
});


app.post('/login', (req, res)=>{
    console.log(req.body);
    validateLoginCredentials(req, res);
});

app.post('/registration', (req, res)=>{   
    console.log(req.body);
    registerLoginCredentials(req, res);
});

app.get('/account', (req, res) => {     
    console.log("url:", req.url);
    getAccountDetails(req, res);
});

app.post('/account', (req, res)=>{
    console.log(req.body);
    createAccountDetails(req, res);
})


app.listen(port, () => {
    console.log(`Tutorial app listening on port ${port}`);
});*/