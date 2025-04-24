require('events').EventEmitter.defaultMaxListeners = 15;
require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');

const connectDB  = require('./utils/db');
const port = 5050;


//Cors
const corsOptions = {
    origin: [process.env.FRONTEND_URL , 'http://localhost:3000'], 
    credentials: true,                // Allow cookies and authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};



app.use(cors(corsOptions));
app.use(express.json());



//define routers



app.get('/', (req, res) => {
  res.send('Hello World!')
})



connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
})