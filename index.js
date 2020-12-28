const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const pdfkit = require('./pdfKit');

const app = express();
const port = 3000;

// expres definitions
app.use(cors());
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use((req,res,next)=>{
    res.append('Access-Control-Allow-Headers','Content-Type');
    next();
})

// get post request from front 
app.post('/doc-data',(req,res)=>{
    console.log(`post request received.`);
    let body = req.body;
    pdfkit.createPdf("balagan");
    res.sendStatus(200);
})

//start server
app.listen(port,()=>{
    console.log(`listenning at http://localhost:${port}`);
})

