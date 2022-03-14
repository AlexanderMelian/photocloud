const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');


// enable CORS
app.use(cors());
// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/static', express.static(path.join(__dirname, '/public/uploads')))

app.use(require('./src/routes'))

app.listen(4000);
console.log('App en puerto 4000')

