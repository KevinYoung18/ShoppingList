const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');


const app = express();

//bodyparser middleware
app.use(bodyParser.json());

// mongoDB URI
const db_key = require('./config/keys').mongoURI;

// connect to Mongo
mongoose.connect(
    db_key,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
    () => console.log('connected to MongoDB')
);

app.use('/api/items', items)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
    
  