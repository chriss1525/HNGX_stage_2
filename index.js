require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// import routes
const person = require('./routes/person.js');

app.use(express.json());
 
app.use('/api', person);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
}
);
