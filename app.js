const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
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
app.use(cors());

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
});