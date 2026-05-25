// setting up express app with right middleware here

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

 
app.get('/', (req, res) => { 
    res.status(200).send('Welcome to the Acquisitions API!');
})

export default app;

