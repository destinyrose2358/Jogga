const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload')
const cors = require('cors');

const db = require('../config/keys').mongoURI;
require('./models/index');
const schema = require('./schema/schema');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas');
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use(cors());

app.use(
  '/graphql',
  graphqlUploadExpress(
    { maxFileSize: 10000000, maxFiles: 10 }
  ),
  expressGraphQL(req => ({
    schema,
    context: {
      token: req.headers.authorization
    },
    graphiql: true
  }))
)

module.exports = app;