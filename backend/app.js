const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//middleware
app.use(cors());
app.options('*', cors());
require('dotenv/config');
app.use(bodyParser.json());
app.use(morgan('tiny'));

//router import
const categoriesRouter = require('./routes/categories');

//router mounting
const api = process.env.API_URL;
app.use(`${api}/categories`, categoriesRouter);

//listenings
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: 'site-three'
})
.then(() => {
  console.log('Mongo DB database connection is ready.');
})
.catch((err) => {
  console.log(err);
})

app.listen(2737, ()=>{
  console.log(api);
  console.log('Server is now running on port 2737.');
})