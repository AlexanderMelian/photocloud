const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// enable CORS
// app.use(cors());
// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(require('./src/routes'))

app.listen(4000);
console.log('App en puerto 4000')

