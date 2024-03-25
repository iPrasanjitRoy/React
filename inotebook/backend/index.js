const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect To MongoDB
connectToMongo();

//  Define Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
