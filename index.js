import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let acquisitions = [];

// Get all acquisitions
app.get('/acquisitions', (req, res) => {
  res.json(acquisitions);
});

// Add a new acquisition


app.listen(PORT, () =>
    { console.log(`Server is running on port ${PORT}...`); }
);