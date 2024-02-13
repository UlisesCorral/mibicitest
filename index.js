const express = require('express')
const {config} = require('./config/index.js')

const {stationsRouter} = require('./routes/stations.router.js');

const helmet = require('helmet') 
const bodyParser = require('body-parser') 
const morgan = require('morgan') 

const app = express()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','authorization, Content-Type');
  next();
})

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

stationsRouter(app);

app.listen(config.port, function() {
//   console.log(`App is running on port: ${config.port}`)
})

module.exports = app