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
//app.use(cors());
app.use(cors({
  origin: "https://gregarious-belekoy-0aca3e.netlify.app", // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get('/', (req, res) => {
    res.send({url: req.url, method: req.method})
});


app.post('https://express-m472.onrender.com/login', (req, res)=>{  //before deployment '/login'
    console.log(req.body);
    validateLoginCredentials(req, res);
});

app.post('https://express-m472.onrender.com/registration', (req, res)=>{   //before deployment '/registration'
    console.log(req.body);
    registerLoginCredentials(req, res);
});

app.get('https://express-m472.onrender.com/account', (req, res) => {      //before deployment '/account'
    console.log("url:", req.url);
    getAccountDetails(req, res);
});

app.post('https://express-m472.onrender.com/account', (req, res)=>{         //before deployment '/account'
    console.log(req.body);
    createAccountDetails(req, res);
})


app.listen(port, () => {
    console.log(`Tutorial app listening on port ${port}`);
});