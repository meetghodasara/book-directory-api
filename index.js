const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api');
const app = express();

app.use(bodyParser.json());
app.use('/api/v1' , api)
app.listen(3000 , console.log('Server started on port 3000'));