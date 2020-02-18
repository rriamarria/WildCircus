const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors =  require('cors');
const http =  require('http');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const contactRoute = require('./routes/sendEmail.route');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_user, process.env.DB_password, {
  host: process.env.HOST,
  dialect:  'mysql' 
});
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/contact', contactRoute);




app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => {
  console.log(process.env.PORT);
});

